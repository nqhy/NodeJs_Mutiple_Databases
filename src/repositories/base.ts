import { Model } from 'mongoose';

import { OptionsBase } from './types';

export default class BaseRepository {
  private model;

  constructor(model: Model<any>) {
    this.model = model;
  }

  getAll(options = {}) {
    const newOptions: OptionsBase = {
      limit: 10,
      page: 1,
      where: {},
      sort: {
        createdAt: -1,
      },
      lean: false,
      ...options,
    };

    if (newOptions.limit > 10) {
      newOptions.limit = 10;
    }
    newOptions.skip = (newOptions.page - 1) * newOptions.limit;
    if (newOptions.populate) {
      return this.model
        .find(newOptions.where)
        .skip(newOptions.skip)
        .limit(newOptions.limit)
        .populate(newOptions.populate)
        .sort(newOptions.sort)
        .select(newOptions.select)
        .lean(newOptions.lean);
    }
    return this.model
      .find(newOptions.where)
      .skip(newOptions.skip)
      .limit(newOptions.limit)
      .sort(newOptions.sort)
      .select(newOptions.select)
      .lean(newOptions.lean);
  }

  get(options = {}) {
    const newOptions: OptionsBase = {
      where: {},
      sort: {
        _id: -1,
      },
      lean: false,
      ...options,
    };

    if (newOptions.populate) {
      return this.model
        .findOne(newOptions.where)
        .skip(newOptions.skip)
        .limit(newOptions.limit)
        .populate(newOptions.populate)
        .select(newOptions.select)
        .lean(newOptions.lean);
    }
    return this.model
      .findOne(newOptions.where)
      .skip(newOptions.skip)
      .limit(newOptions.limit)
      .select(newOptions.select)
      .lean(newOptions.lean);
  }

  findOneAndUpdate(options: OptionsBase) {
    return this.model
      .findOneAndUpdate(options.where, options.data)
      .lean(options.lean);
  }

  updateOne(option: OptionsBase) {
    return this.model.updateOne(option.where, option.data);
  }

  aggregate(option = []) {
    return this.model.aggregate(option);
  }

  create(data = {}) {
    return new this.model(data);
  }
}
