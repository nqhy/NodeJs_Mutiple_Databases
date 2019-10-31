export default abstract class BaseAPI {
  protected server;

  private apiURL;

  constructor(server, url) {
    this.server = server;
    this.apiURL = url;
  }

  setRouter(router) {
    this.server.use(this.apiURL, router);
  }
}
