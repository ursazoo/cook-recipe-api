import { parse } from "yaml";
import * as path from "path";
import * as fs from "fs";

// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUN_TIME_ENV;
};

export const IS_LOCAL = getEnv() === "local";
// 读取项目配置
export const getConfig = () => {
  const environment = getEnv();
  console.log(`当前运行的环境: ${environment}`);
  const yamlPath = path.join(
    process.cwd(),
    `./config/application.${environment}.yml`
  );
  const file = fs.readFileSync(yamlPath, "utf8");
  return parse(file);
};
