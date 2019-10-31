import { UserModel } from '../models';
import BaseRepository from './base';

export default class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel);
  }
}
