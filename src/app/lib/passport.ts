import * as passport from 'passport';
import * as  bcrypt from 'bcrypt-as-promised';
import {Strategy as LocalStrategy} from 'passport-local';

import User from '../models/user';

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    let user = await User.findOne({_id: id});
    cb(null, user);
  } catch(err) {
    console.log('deserialize:\n', err);
  }
});

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      let user = await User.findOne({username: username});
      if (!user) return done(null, false);
      let res = await bcrypt.compare(password, user.hash);
      if(res) return done(null, user);
      else return done(null, false);
    } catch(err) {
      console.log(err);
      done(null, false);
    }
  }
));

export default passport;
