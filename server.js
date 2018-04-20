import express from 'express';
import path from 'path';
import passport from 'passport';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';

/*================ Import App ================*/
import apiRoutes from './routes/api';
import appRoutes from './routes/app';
import authRoutes from './routes/auth';
import indexRoutes from './routes/index';

/*================ Import Models ================*/
import User from "./models/user";
import Shop from "./models/shop";

const app = express();
mongoose.connect(process.env.CONFIG_MLAB_DATABASE);

/*================ settings ================*/
const cookieConfig = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    keys: [process.env.CONFIG_COOKIE_KEY],
    httpOnly: false
};

/*================ Express Middleware ================*/
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({ secret: process.env.CONFIG_COOKIE_KEY }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

/*================ Passport User Identification ================*/
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    if (process.env.APP_GRANT_OPTIONS) { // If Online access_token is required based on user Scope Levels
        User.findById(id).then((user) => {
            done(null, user);
        });
    } else { // If Offline access_token is required based App requested Scope
        Shop.findById(id).then((user) => {
            done(null, user);
        });
    }
});

/*================ Public Rules - React.js Front-end ================*/
app.use('/static', express.static(path.join(__dirname, process.env.CONFIG_LOCAL_BUILD === "true" ? "/.." : "", '/client/build', '/static')));

/*/!*================ Private Rules - User Specific - Express.js Back-end - React.js Front-end ================*!/
App.use('/api', apiRoutes);
App.use('/App/api', apiRoutes);
App.use('/App', appRoutes);

/!*================ Public App - Express.js Passport.js Back-end - React.js Front-end ================*!/
App.use('/auth', authRoutes);*/
app.use('/', indexRoutes);


/*================ Server Startup ================*/
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('port')}`);
});