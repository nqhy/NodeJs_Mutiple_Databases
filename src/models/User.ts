import { Schema, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { IUser } from './types';
import { ErrorMessage } from '../helpers/generateMessage';
import { email_regexp, phone_regexp } from '../constants';

export const UserSchema = new Schema(
  {
    fullName: {
      first: {
        type: String,
        required: [
          false,
          ErrorMessage({ type: 'Required', field: 'first Name' }),
        ],
        maxLength: [30, ErrorMessage({ type: 'TooLong', field: 'first name' })],
      },
      last: {
        type: String,
        required: [
          true,
          ErrorMessage({ type: 'Required', field: 'last Name' }),
        ],
        maxLength: [30, ErrorMessage({ type: 'TooLong', field: 'last name' })],
      },
    },
    email: {
      type: String,
      required: [true, ErrorMessage({ type: 'Required', field: 'email' })],
      maxLength: [30, ErrorMessage({ type: 'TooLong', field: 'email' })],
      match: [email_regexp, ErrorMessage({ type: 'Invalid', field: 'email' })],
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, ErrorMessage({ type: 'Required', field: 'password' })],
    },
    phone: {
      type: String,
      index: true,
      required: [true, ErrorMessage({ type: 'Required', field: 'Phone' })],
      unique: true,
    },
    role: {
      type: String,
      default: 'member',
    },
    address: {
      code: { type: String },
      homeAddress: { type: String },
    },
    avatar: { type: String },
  },
  { timestamps: { createdAt: 'createdAt' } },
);

UserSchema.plugin(uniqueValidator, { message: 'User is already taken !' });

const User = model<IUser>('User', UserSchema);

export default User;
