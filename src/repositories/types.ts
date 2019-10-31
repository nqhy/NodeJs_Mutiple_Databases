export interface OptionsBase {
  limit?: number;
  page?: number;
  where: object;
  sort?: object;
  lean: boolean;
  [options: string]: any;
}
