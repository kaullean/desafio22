import { Router } from 'express'
import productosRouter from './productos'
import { productosService } from '../services/productos';
import { mensajesService } from '../services/mensajes';
import { denormalize } from 'normalizr';
import { normalize, schema } from 'normalizr';
import passport from '../middlewares/auth';

const author = new schema.Entity('author',
 {}, 
 { idAttribute: 'email' });

const msge = new schema.Entity(
  'message',
  {
    author: author,
  },
  { idAttribute: 'time' }
);

const msgesSchema = new schema.Array(msge);

const miRouter = Router();

miRouter.use('/api/productos', productosRouter)


miRouter.get('/', async (req, res) =>{
    let normalizedMsj=await mensajesService.leer();
    let denormalizedMsj= denormalize(normalizedMsj.result,msgesSchema,normalizedMsj.entities)
    let data = {
      usuario:req.session.usuario,
        layout: 'index',
        mensajes:denormalizedMsj
    }

    res.render('main',data)
})

// miRouter.post('/login',passport.authenticate('login'),(req,res) =>{
    
//   const{user}=req.query
//   if(!user)
//   {
//       let data= {
//           layout: 'index'
//       }
//       res.render('main',data)
//   }
//   else{
//       req.session.logeado=true;
//       req.session.usuario=user;
//       let data= {
//           usuario:user,
//           layout: 'index'
//       }
//       res.render('main',data)
//       //res.json({msg:`bienvenido ${req.session.logeado}`})
//   }
  
// })
miRouter.get('/login',(req,res) => {

      let data= {
          layout: 'index'
      }
      res.render('main',data)
  
})
miRouter.post('/login', passport.authenticate('login'), function (req, res) {
  
  res.json({ msg: 'Welcome!', user: req.user });
});

miRouter.post('/signup', (req, res, next) => {
  passport.authenticate('signup', function (err, user, info) {
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json({ data: info });

    res.json({ msg: 'signup OK' });
  })(req, res, next);
  console.log("asd");
});

const validateLogIn = (req, res, next) => {
  if (req.session.logeado) next();
  else res.status(401).json({ msg: 'no estas autorizado' });
};

// miRouter.get('/logout',validateLogIn, (req, res) => {
//   req.session.destroy();
//   res.json({ msg: 'session destruida' });
// });

export default miRouter;