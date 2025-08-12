import dotenv from 'dotenv';

dotenv.config({});

class Config {
  public GATEWAY_JWT_TOKEN: string | undefined;
  public GATEWAY_KEY: string | undefined;
  public DATABASE_URL: string | undefined;
  public NODE_ENV: string | undefined;
  public API_GATEWAY_URL: string | undefined;
  public BROKER1_URL: string | undefined;
  public BROKER2_URL: string | undefined;
  public BROKER3_URL: string | undefined;

  constructor() {
    this.GATEWAY_JWT_TOKEN = process.env.GATEWAY_JWT_TOKEN || '';
    this.GATEWAY_KEY = process.env.GATEWAY_KEY || '';
    this.DATABASE_URL = process.env.DATABASE_URL || '';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.API_GATEWAY_URL = process.env.API_GATEWAY_URL || '';
    this.BROKER1_URL = process.env.BROKER1_URL || '';
    this.BROKER2_URL = process.env.BROKER2_URL || '';
    this.BROKER3_URL = process.env.BROKER3_URL || '';
  }
}

export const config: Config = new Config();
