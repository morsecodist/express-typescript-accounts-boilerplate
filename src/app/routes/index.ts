import * as express from "express";
const routes = express.Router();

routes.get('/', (req, res, next) => {
  res.render('static/home', {title: ''});
});

routes.get('/login', (req, res, next) => {
  res.render('users/login');
});

export default routes;
