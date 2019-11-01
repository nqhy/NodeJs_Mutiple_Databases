import { UserModel } from '../models';
import BaseMongooseRepository from './baseMongoose';

export default class UserRepository extends BaseMongooseRepository {
  constructor() {
    super(UserModel);
  }
}
