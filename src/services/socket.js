import socketIo, { Socket } from 'socket.io'
import { productosService } from './productos';
import { formatoMensaje } from '../utils/mensajes'
import { mensajesService } from './mensajes'

class SocketService {

    initWSService(server){
        
        
        if(!this.myWSServer){
            this.myWSServer = socketIo(server);
            this.myWSServer.on('connection', (socket) =>{
                console.log("Nueva conexion");  
                
                /*Escucha nuevos productos*/
                socket.on('nuevo-Producto', (data) =>{
                    productosService.agregar(data);
                    
                    this.myWSServer.emit('nuevoProducto',data)
                })

                /* responde con los mensajes y los productos del historial */
                socket.on('askData',async (data) =>{
                    socket.emit('productos',productosService.leer())
                    socket.emit('nuevo-mensaje',await mensajesService.leer())
                })
                
                /*Escucha nuevos mensajes*/
                socket.on('nuevo-mensaje', (data) => {
                    data=formatoMensaje(data);
                    mensajesService.agregar(data);
                    this.myWSServer.emit('nuevoMensaje',data)
                })

            });

        }
        return this.myWSServer;
    }

    getServer(){
        return this.myWSServer;
    }
}

export const socketService = new SocketService();