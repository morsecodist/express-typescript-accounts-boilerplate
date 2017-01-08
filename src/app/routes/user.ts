import * as express from 'express';
import * as bcrypt from 'bcrypt-as-promised';
const users = express.Router();

import User from '../models/user';
import passport from '../lib/passport';

import ensureAuthenticated from '../lib/ensure_authenticated';

users.get('/signup', (req, res, next) => {
  res.render('users/create');
});

users.post('/create', async (req, res) => {
  try{
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.password, salt);
    await User.create({username: req.body.username, email: req.body.email, hash: hash});
    passport.authenticate('local', {failureRedirect: '/login'})(req, res, () => {
      res.redirect('/users/profile');
    });
  } catch(err) {
    console.log(err);
    res.redirect('/users/signup');
  }
});

users.get('/profile', ensureAuthenticated, async (req, res, next) => {
  let user = await User.findOne({_id: req.user.id});
  res.render('users/show', user);
});

users.post('/update', ensureAuthenticated, async (req, res, next) => {
  try {
    let user = await User.findOne({_id: req.user.id});
    for(let key in req.body) {
      user[key] = req.body[key];
    }
    await user.save();
    res.render('users/show', user);
  } catch(err) {
    console.log(err);
    res.render('users/show', req.user);
  }
});

users.post('/delete', ensureAuthenticated, async (req, res, next) => {
  try {
    let user = await User.findOne({_id: req.user.id});
    await user.remove();
    res.redirect('/logout');
  } catch(err) {
    console.log(err);
    res.render('users/show', req.user);
  }
});

users.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: false }),
  (req, res) => {
    res.redirect('/users/profile');
  });

users.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default users;
