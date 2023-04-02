import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as geoip from 'geoip-lite';

@Injectable()
export class RequestIpService {
  recordIp(request: Request): { data: any } {
    const realIp =
      request.headers['x-real-ip'] || request.connection.remoteAddress;
    const geo = geoip.lookup(realIp);
    const clientIp = {
      ip: realIp,
      region: geo ? geo.region : 'unknown',
    };

    return {
      data: clientIp,
    };
    // Do some record logic here
  }
}
