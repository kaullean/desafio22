// import moment from 'moment'
const socket = io.connect();

socket.emit('askData');


//Funciones que manipulan productos
function addProduct(){

    let titulo=document.getElementById("title").value;
    let precio=parseInt(document.getElementById("price").value)
    let imagen=document.getElementById("imgUrl").value;
    let nuevoProducto={
        title:titulo ,
        price:precio ,
        imgUrl:imagen,
    }
    socket.emit('nuevo-Producto',nuevoProducto)
}

function renderNuevoProducto(nuevoProducto){
    let containerProductos=document.getElementById('containerProductos');
    let noHayDatos=document.getElementById('noHayProductos').parentElement;
    noHayDatos.setAttribute('style', 'display : none')
    let nuevoElemento=document.createElement('tr')
    
    let plantilla=`                                
            <td class="text-center">${nuevoProducto.title} </td>
            <td class="text-center">${nuevoProducto.price}</td>
            <td class="text-center"><img src=${nuevoProducto.imgUrl}></td>
        `;

    nuevoElemento.innerHTML=plantilla;    
    containerProductos.appendChild(nuevoElemento);    
}

socket.on('nuevoProducto', (data) =>{
    renderNuevoProducto(data);
})

//Funciones que manipulan mensajes
function addMsg(){
   
    let userEmail=document.getElementById("userEmail").value;
    let msg=document.getElementById("mensaje").value

    const nuevoMensaje={
        user:userEmail,
        mensaje:msg,
    }
    userEmail.value='';
    msg.value='';

    socket.emit('nuevo-mensaje',nuevoMensaje)
}

function renderNuevoMensaje(nuevoMensaje){
    let containerMensajes=document.getElementById('msgContainer');

    let msg=document.createElement('div')
    msg.className="d-flex flex-row col-12"
    
    let plantilla=`                                
                   
            <h5 class="text-info p-2">${nuevoMensaje.user}</h5>
            <h5 class="text-danger p-2">[${nuevoMensaje.time}]</h5>
            <i class="text-success p-2">${nuevoMensaje.mensaje}</i>
           
        `;

    msg.innerHTML=plantilla;    
    containerMensajes.appendChild(msg);    
}

socket.on('nuevoMensaje', (data) =>{
    
    renderNuevoMensaje(data);
})