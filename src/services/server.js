import express from 'express'
import path from 'path'
import handlebars from 'express-handlebars'
import * as http from 'http';
import { socketService } from './socket';
import miRouter from '../routes/index';
import session from 'express-session'

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
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret:"esto es secreto",
        coockie:{ maxAge: 5000 },
        saveUninitialized:true,
        resave:false,
    })
)
app.get('/login',(req,res) =>{
    
    const{user}=req.query
    if(!user)
    {
        let data= {
            layout: 'index'
        }
        res.render('main',data)
    }
    else{
        req.session.logeado=true;
        req.session.usuario=user;
        let data= {
            usuario:user,
            layout: 'index'
        }
        res.render('main',data)
        //res.json({msg:`bienvenido ${req.session.logeado}`})
    }
    
})
const validateLogIn = (req, res, next) => {
    if (req.session.logeado) next();
    else res.status(401).json({ msg: 'no estas autorizado' });
};
app.get('/logout',validateLogIn, (req, res) => {
    req.session.destroy();
    res.json({ msg: 'session destruida' });
  });

/* Router */
app.use('/',validateLogIn, miRouter)

export default myHTTPServer;