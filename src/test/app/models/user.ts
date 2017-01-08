import * as mocha from 'mocha';
import {assert} from 'chai';
import * as mongoose from 'mongoose';

import User from '../../../app/models/user'

mongoose.connect(process.env.MONGODB);

describe('User', () => {
  describe('#create', () => {
    it('should have a create function', () => {
      assert.isNotNull(User.create);
    });
  });
});
