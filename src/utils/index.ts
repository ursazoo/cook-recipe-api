import { parse } from 'yaml';
import path = require('path');
import fs = require('fs');

export const getEnv = () => process.env.RUN_TIME_ENV;

export const getConfig = (type?: string) => {
  const environment = getEnv();
  const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  if (type) {
    return config[type];
  }
  return config;
};
