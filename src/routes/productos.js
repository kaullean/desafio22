import { Router } from 'express'
import { socketService } from '../services/socket';
import { productosService } from '../services/productos';

const miRouter = Router();

miRouter.get('/listar',(req, res) => {
    /* 
        Responde con los productos cargados, si los hay
    */
    let productos=productosService.leer();
    if(!productos){
        return res.status(404).json({
            error:"No hay productos cargados"
        });
    }
    else
        return res.status(201).json(productos);
})

miRouter.get('/listar/:id', (req, res) => {
    /* 
        Responde con el producto correspondiente al 
        id buscado en caso de encontrarlo
    */
    let productoBuscado=productosService.obtenerUnProducto(parseInt(req.params.id));
    if(!productoBuscado){
        return res.status(404).json({
            error:"No hay productos cargados"
        });
    }
    if(productoBuscado === -1){
        return res.status(404).json({
            error:"producto no encontrado"
        });
    }
    else
        return res.status(201).json(productoBuscado);
})

miRouter.post('/guardar',(req,res)=>{
    /* 
        Guarda un producto y responde 
        con el producto que se guardo
    */
    let productoIngresado = req.body;
    
    productoIngresado.price = parseInt(productoIngresado.price)

    productoIngresado = productosService.agregar(productoIngresado);
    
    const myWSServer = socketService.getServer();

    myWSServer.emit('nuevoProducto', productoIngresado);
    return res.status(201).json(productoIngresado);
    
})

miRouter.put('/actualizar/:id', (req, res) =>{
    /* 
        Actualiza un producto y responde con el producto actualizado
    */
    let productoIngresado= req.body;
    let idBuscado= parseInt(req.params.id);
    let data = productosService.actualizar(idBuscado,productoIngresado)
    
    if(!data){
        return res.status(404).json({
            error:"No hay productos cargados"
        });
    }
    if(data === -1){
        return res.status(404).json({
            error:"Id no encontrado"
        });
    }
    else{
        return res.status(201).json(data);    
    }

})

miRouter.delete('/borrar/:id', (req, res) => {
    /* 
        Elimina un producto y responde con el producto eliminado
    */
    let idBuscado= parseInt(req.params.id);
    let data = productosService.eliminar(idBuscado)
    
    if(!data){
        return res.status(404).json({
            error:"No hay productos cargados"
        });
    }
    if(data === -1){
        return res.status(404).json({
            error:"Id no encontrado"
        });
    }
    else{
        return res.status(201).json(data);    
    }
})
export default miRouter;