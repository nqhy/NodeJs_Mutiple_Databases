import BaseAPI from './base';

export default class V1API extends BaseAPI {
  private static instance: V1API;

  static getInstance(server) {
    if (!V1API.instance) {
      const instance = new V1API(server, '/api/v1');
      V1API.instance = instance;
    }
    return V1API.instance;
  }
}
