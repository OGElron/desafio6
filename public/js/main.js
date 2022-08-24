const socket = io.connect();
//------------------------------------------------------------------------------------

//form
const formAddItem = document.getElementById('formAddItem');

formAddItem.addEventListener('submit', () => {
    const name = document.querySelector("#name").value;
    const price = document.querySelector("#price").value;
    const thumbnail = document.querySelector("#thumbnail").value;

    const producto = {
        name: name,
        price: price,
        thumbnail: thumbnail
    };
   socket.emit('producto', producto);
});

socket.on("productos", async productos => {
    const info = renderTable(productos);
    const div = document.querySelector("#productos");
    div.innerHTML = await info
});

function renderTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
};

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', () => {

    //Armar el objeto de mensaje y luego emitir mensaje al evento nuevoMensaje con sockets
    const text = inputMensaje.value;
    const autor = inputUsername.value;
    const date = Date.now();
    const newDate = new Date(date);
    const fecha = newDate.toLocaleString();
    const mensaje = {
        mensaje: text, 
        autor: autor, 
        fecha: fecha
    }
    socket.emit('nuevoMensaje', mensaje);
    
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('mensajes', async data => {
    console.log(data)
    const info = renderList(data);
    const div = document.getElementById('mensajes');
    div.innerHTML = await info;
})

const renderList = async (mensajes) => {
    const html = mensajes.map((el) => {
        return(`<div><span class="autor">${el.autor}</span> <span class="fecha">${el.fecha}:</span>  <span class="mensaje">${el.mensaje}</span></div>`)
    }).join(" ");
    return html
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})
