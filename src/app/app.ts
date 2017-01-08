import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as session from "express-session";

import * as mongoose from "mongoose";
import * as env from "node-env-file"

import passport from './lib/passport.js';
import routes from './routes/index';
import users from './routes/user';

 env(__dirname + '/../.env');

mongoose.connect(process.env.MONGODB);

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(
  session(({
    secret:'white bear',
    resave: true,
    saveUninitialized: false,
    key: 'connect.sid'
  } as session.SessionOptions))
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  (err as any).status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace

declare global {
    interface Error {
        status: number;
    }
}

if (app.get('env') === 'development') {
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export default app;
