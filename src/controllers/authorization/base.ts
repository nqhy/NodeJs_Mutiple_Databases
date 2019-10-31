import { Role } from '../../models/types/UserTypes';

export default abstract class BaseAuthorization {
  protected role: Role;

  constructor(role) {
    this.role = role;
  }

  abstract get isAuthorized(): boolean;
}
