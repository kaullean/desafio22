import { Router } from 'express'
import productosRouter from './productos'
import { productosService } from '../services/productos';
import { mensajesService } from '../services/mensajes';
import { denormalize } from 'normalizr';
import { normalize, schema } from 'normalizr';
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


export default miRouter;