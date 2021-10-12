import express from 'express'
import path from 'path'
import handlebars from 'express-handlebars'
import * as http from 'http';
import { socketService } from './socket';
import miRouter from '../routes/index';
import session, { Store } from 'express-session'
import MongoStore from 'connect-mongo'
import config from '../config';
import cookieParser from 'cookie-parser';
import passport from '../middlewares/auth'

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const StoreOptions = {
    store: MongoStore.create({
      mongoUrl: config.MONGO_ATLAS_URL,
      mongoOptions: advancedOptions,
    }),

    secret: 'secreto',
    resave: false,
    saveUninitialized: false ,
    cookie: {
        maxAge: 60000
    } ,
  };
const app = express();

const myHTTPServer = http.Server(app);
const myWSServer = socketService.initWSService(myHTTPServer)

const publicDir = path.resolve(__dirname, '../../public')
app.use(express.static(publicDir))

const layoutDir = path.resolve(__dirname, '../../views/layouts')

/*  HBS CONFIG  */
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir:layoutDir,   
    extname:'hbs',
}))

app.use(express.json())
app.use(cookieParser());
app.use(session(StoreOptions))

app.use(passport.initialize())
app.use(passport.session())



/* Router */
app.use('/', miRouter)

export default myHTTPServer;