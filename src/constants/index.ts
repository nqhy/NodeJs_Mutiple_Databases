export const saltRounds = 10;

// REGEXP

export const email_regexp = /S+@S+.S+/;
export const phone_regexp = /(09|01[2|6|8|9])+([0-9]{8})\b/;

export { default as ErrorCode } from './ErrorCode';

export { RequestMethod } from './CommonTypes';

export { defaultAllowRoutes, defaultAllowMethods } from './defaultConfigs';

export {
  NotFound,
  NotHavePermission,
  CreateFailure,
  BadRequest,
} from './CommonErrorConfigs';
