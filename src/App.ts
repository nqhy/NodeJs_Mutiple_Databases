import * as express from 'express';

class App {
  public express;
  public router;

  constructor() {
    this.express = express();
    this.router = express.Router();
  }

  public setStatic(value) {
    this.express.use(express.static(value));
  }
}

export default new App();
