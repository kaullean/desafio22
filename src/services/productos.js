
let id=1;
let productos=[
    //  {
    //     title:"Calculadora",
    //     price:200,
    //     imgUrl:'imagenCalculadora',
    //     id:id++,
    // },
    // {
    //     title:"Lapiz",
    //     price:55,
    //     imgUrl:'imagenLapiz',
    //     id:id++,
    // },
    // {
    //     title:"Reloj",
    //     price:120,
    //     imgUrl:'imagenReloj',
    //     id:id++,
    // },
    // {
    //     title:"Mochila",
    //     price:200,
    //     imgUrl:'imagenMochila',
    //     id:id++,
    // },
]
class ProductosService {
    //Leer devuelve false si no hay productos y los productos si los hay
    leer(){
        
        if(productos.length === 0)        
            return false;// errorValue para productos no cargados
        
        return productos;
    }
    obtenerUnProducto(idDelProducto)
    {
        if(productos.length === 0)        
            return false;// errorValue para productos no cargados
        

        const producto = productos.find((unProducto) => 
            unProducto.id === idDelProducto
        );

        if(!producto)        
            return -1;//ErrorValue para el id no encontrado
        
        else
            return producto;
    }
    agregar(unProducto){
        
        const nuevoProducto={
            id:id,
            title:unProducto.title,
            price:unProducto.price,
            imgUrl:unProducto.imgUrl
        }
        id++;

        productos.push(nuevoProducto);

        return nuevoProducto;
    }
    actualizar(idDelProducto,productoActualizado){

        if(productos.length === 0)        
            return false;// errorValue para productos no cargados    
            
        else{
            for(let i=0;i<productos.length;i++){            
                if(productos[i].id === idDelProducto){ 
                    productoActualizado={
                        /*Como el producto actualizado no
                        tiene el campo id, se lo igualo
                        al id del producto buscado y lo
                        coloco como primer atributo para
                        respetar el formato del objeto */

                        id:productos[i].id,
                        ...productoActualizado,
                    }

                    productos[i]=productoActualizado
                    return productos[i];
                }       
            }      
            return -1; //ErrorValue para el id no encontrado     
        }
    }
    eliminar(idAEliminar){

        let productoAEliminar=this.obtenerUnProducto(idAEliminar);

        if(productos.length === 0)        
            return false;// errorValue para productos no cargados        
        if(productoAEliminar === -1)        
            return -1        
        else{
            productos = productos.filter(unProducto => unProducto.id !== idAEliminar)
            return productoAEliminar;
        }
    }
}

export const productosService = new ProductosService();