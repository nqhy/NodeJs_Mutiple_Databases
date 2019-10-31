import BaseAuthorization from './base';

export default class ContentAuthorization extends BaseAuthorization {
  private static instance: ContentAuthorization;

  get isAuthorized() {
    return (
      ContentAuthorization.instance.role === 'hr' ||
      ContentAuthorization.instance.role === 'admin'
    );
  }

  static getInstance(role) {
    if (!ContentAuthorization.instance) {
      ContentAuthorization.instance = new ContentAuthorization(role);
    }
    return ContentAuthorization.instance;
  }
}
