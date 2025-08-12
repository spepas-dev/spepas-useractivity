import { config } from '@useractivity/config';
import axios from 'axios';

export class AxiosService {
  public axios: ReturnType<typeof axios.create>;

  // constructor(baseUrl: string, serviceName: string) {
  constructor(baseUrl: string) {
    // this.axios = this.axiosCreateInstance(baseUrl, serviceName);
    this.axios = this.axiosCreateInstance(baseUrl);
  }

  // public axiosCreateInstance(baseUrl: string, serviceName?: string): ReturnType<typeof axios.create> {
  //   let requestGatewayToken = '';
  //   if (serviceName) {
  //     requestGatewayToken = sign({ id: serviceName }, `${config.GATEWAY_JWT_TOKEN}`);
  //   }
  //   const instance: ReturnType<typeof axios.create> = axios.create({
  //     baseURL: baseUrl,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       gatewayToken: requestGatewayToken
  //     },
  //     withCredentials: true
  //   });
  //   return instance;
  // }

  public axiosCreateInstance(baseUrl: string): ReturnType<typeof axios.create> {
    // let requestGatewayToken = '';
    // if (serviceName) {
    //   requestGatewayToken = sign({ id: serviceName }, `${config.GATEWAY_JWT_TOKEN}`);
    // }
    const instance: ReturnType<typeof axios.create> = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // gatewayToken: requestGatewayToken,
        token: config.GATEWAY_JWT_TOKEN,
        key: config.GATEWAY_KEY
      },
      withCredentials: true
    });
    return instance;
  }
}
