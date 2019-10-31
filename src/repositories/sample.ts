import Sample from '../models/sample';
import BaseRepository from './base';

export default class SampleRepository extends BaseRepository {
  constructor() {
    super(Sample);
  }
}
