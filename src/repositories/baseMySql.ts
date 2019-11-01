import { getManager } from 'typeorm';

export default class BaseMySqlRepositroy {
  private entity;

  constructor(entity: any) {
    this.entity = entity;
  }

  getAll() {
    return getManager()
      .getRepository(this.entity)
      .find();
  }

  create(data = {}) {
    return getManager()
      .getRepository(this.entity)
      .save(data);
  }
}
