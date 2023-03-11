import { Injectable } from '@nestjs/common';
import moment from 'moment';
// import COS from 'cos-nodejs-sdk-v5';
// import STS from 'qcloud-cos-sts';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const STS = require('qcloud-cos-sts');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const COS = require('cos-nodejs-sdk-v5');

import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

// app.service.ts

@Injectable()
export class CosService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  private secretId: string = this.configService.get<string>('SECRET_ID');
  private secretKey: string = this.configService.get<string>('SECRET_KEY');
  private cos: any = {};
  private stsConfig: any = {
    secretId: this.secretId, // 固定密钥
    secretKey: this.secretKey, // 固定密钥
    proxy: '',
    durationSeconds: 1800, // 密钥有效期
    // host: 'sts.tencentcloudapi.com', // 域名，非必须，默认为 sts.tencentcloudapi.com
    endpoint: 'sts.tencentcloudapi.com', // 域名，非必须，与host二选一，默认为 sts.tencentcloudapi.com

    // 放行判断相关参数
    bucket: 'cook-master-1315803049', // 换成你的 bucket
    region: 'ap-nanjing', // 换成 bucket 所在地区
    allowPrefix: '*', // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
    // 密钥的权限列表。简单上传和分片需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/31923
    allowActions: [
      // 简单上传
      'name/cos:PutObject',
      'name/cos:PostObject',
      // 分片上传
      'name/cos:InitiateMultipartUpload',
      'name/cos:ListMultipartUploads',
      'name/cos:ListParts',
      'name/cos:UploadPart',
      'name/cos:CompleteMultipartUpload',
    ],
  };
  private credentials: any;

  async uploadAssets(files): Promise<any> {
    console.log('资源', files);

    if (!files.length) {
      return null;
    }

    const { key, buffer } = await this.handleParams(files);

    return await this.handleImage({ key, buffer });
  }

  async init() {
    this.cos = new COS({
      getAuthorization: async (options, callback) => {
        // 初始化时不会调用，只有调用 cos 方法（例如 cos.putObject）时才会进入
        // 异步获取临时密钥

        const result = await this.getCredential();

        console.log('=====result=====');
        console.log(result);

        // const result = this.httpService.post('https://example.com/sts', {});

        if (result) {
          const data = JSON.parse(result);
          const credentials = data.credentials;

          if (!data || !credentials)
            return console.error('credentials invalid');

          console.log(`===tmpSecretId: ${credentials.tmpSecretId}`);
          console.log(`===tmpSecretKey: ${credentials.tmpSecretKey}`);
          console.log(`===sessionToken: ${credentials.sessionToken}`);

          callback({
            TmpSecretId: credentials.tmpSecretId, // 临时密钥的 tmpSecretId
            TmpSecretKey: credentials.tmpSecretKey, // 临时密钥的 tmpSecretKey
            SecurityToken: credentials.sessionToken, // 临时密钥的 sessionToken
            ExpiredTime: data.expiredTime, // 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSeconds
          } as any);
        }

        // this.httpService(
        //   {
        //     url: 'https://example.com/sts',
        //     data: {
        //       // 可从 options 取需要的参数
        //     },
        //   },
        //   function (err, response, body) {
        //     const data = JSON.parse(body);
        //     const credentials = data.credentials;
        //
        //     if (!data || !credentials)
        //       return console.error('credentials invalid');
        //
        //     callback({
        //       TmpSecretId: credentials.tmpSecretId, // 临时密钥的 tmpSecretId
        //       TmpSecretKey: credentials.tmpSecretKey, // 临时密钥的 tmpSecretKey
        //       SecurityToken: credentials.sessionToken, // 临时密钥的 sessionToken
        //       ExpiredTime: data.expiredTime, // 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSeconds
        //     } as any);
        //   },
        // );
      },
    });
  }

  // 获取临时秘钥
  async getCredential(): Promise<any> {
    const shortBucketName = this.stsConfig.bucket.substr(
      0,
      this.stsConfig.bucket.lastIndexOf('-'),
    );
    const appId = this.stsConfig.bucket.substr(
      1 + this.stsConfig.bucket.lastIndexOf('-'),
    );
    const policy = {
      version: '2.0',
      statement: [
        {
          action: this.stsConfig.allowActions,
          effect: 'allow',
          principal: { qcs: ['*'] },
          resource: [
            'qcs::cos:' +
              this.stsConfig.region +
              ':uid/' +
              appId +
              ':prefix//' +
              appId +
              '/' +
              shortBucketName +
              '/' +
              this.stsConfig.allowPrefix,
          ],
        },
      ],
    };

    console.log('=======policy====');
    console.log(JSON.stringify(policy));

    // let result = {};

    try {
      const result = await STS.getCredential({
        secretId: this.stsConfig.secretId,
        secretKey: this.stsConfig.secretKey,
        proxy: this.stsConfig.proxy,
        durationSeconds: this.stsConfig.durationSeconds,
        endpoint: this.stsConfig.endpoint,
        policy: policy,
      });
      return JSON.stringify(result);
    } catch (e) {
      return JSON.stringify(e);
    }

    /**
     * function (err, tempKeys) {
     *         // console.log('====error=====');
     *         // console.log(err);
     *         // console.log('====tempKeys=====');
     *         // console.log(tempKeys);
     *         result = JSON.stringify(err || tempKeys) || '';
     *         return JSON.stringify(err || tempKeys) || '';
     *       },
     */

    // console.log('========临时凭证====');
    // console.log(result);
    // return result;
  }

  async handleParams(files) {
    const file = files[0];
    const { originalname, buffer } = file;

    // 图片格式默认值
    let suffix = 'jpg';

    const names = originalname.split('.');
    if (names.length) {
      suffix = names[names.length - 1];
    }
    const time = new Date().getTime();
    const fileName = `${time}.${suffix}`;

    // 以时间为目录
    const catalog = '2023-03-11' || moment(Date.now()).format('YYYY-MM');
    // 拼装图片目录
    // const key = `common/${catalog}/${fileName}`;
    const key = fileName;
    return { buffer, key };
  }

  async handleImage({ buffer, key }) {
    await this.init();

    console.log(`======this.cos========`);
    console.log(this.cos);
    this.cos.putObject(
      {
        Bucket: 'cook-master-1315803049' /* 必须 */,
        Region: 'ap-nanjing' /* 必须 */,
        StorageClass: 'STANDARD',
        // Key: key /* 必须 */,
        // Body: buffer, // 上传文件对象
        Key: '3.txt',
        Body: Buffer.from('hello!'),
        onProgress: function (progressData) {
          console.log('=====onProgress=====');
          console.log(JSON.stringify(progressData));
        },
      },
      function (err, data) {
        // console.log(err || data)
        const requestId = (err || data).headers['x-cos-request-id'];

        // console.log(`requestId: ${requestId}`);

        // console.log('========error put=====');
        // console.log(err);
        //
        // console.log('========data put=====');
        // console.log(data);
        if (!err) {
          const { Location } = data;
          // 将存储桶地址换成CDN地址
          // CDN地址是下面第2步中`自定义加速域名`
          const url = Location.replace('存储桶地址', 'CDN地址');
          // resolve(url);
          return url;
        } else {
          return err;
        }
      },
    );
    // return new Promise((resolve, reject) => {
    //   console.log(this.cos);
    //
    // });
  }
}
