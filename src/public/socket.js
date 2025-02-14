const socketClient = io()
let form = document.getElementById("submit-crear")
form.addEventListener("click",(e)=>{
    
    let nombre = document.getElementById("nombre-crear").value;
    let descripcion = document.getElementById("descripcion-crear").value;
    let codigo = document.getElementById("codigo-crear").value;
    let stock = document.getElementById("stock-crear").value;
    let precio = document.getElementById("precio-crear").value;
    let categoria = document.getElementById("categoria-crear").value;
    socketClient.emit("crearProducto",{
        nombre:nombre,
        descripcion:descripcion,
        codigo:codigo,
        stock:stock,
        precio:precio,
        categoria:categoria
    })
}) 

socketClient.on("productosIniciales",(data)=>{
    let container = document.getElementById("container")
    container.innerHTML= ""
    data.forEach(element => {
        container.innerHTML += `
        <div >
            <h3>${element.nombre.toUpperCase()}</h3>
            <p>${element.precio}$</p>
            <button>Agregar al carrito</button>
        </div>`
    });
})

let botonBorrar = document.getElementById("submit-borrar")
botonBorrar.addEventListener("click",(e)=>{
    let id = document.getElementById("id-borrar").value;
    socketClient.emit("borrarProducto",id)
}) 

let botonEditar = document.getElementById("submit-editar")
botonEditar.addEventListener("click",(e)=>{
    let idEditar = document.getElementById("id-editar").value
    let nombreEditar = document.getElementById("nombre-editar").value;
    let descripcionEditar = document.getElementById("descripcion-editar").value;
    let codigoEditar = document.getElementById("codigo-editar").value;
    let stockEditar = document.getElementById("stock-editar").value;
    let precioEditar = document.getElementById("precio-editar").value;
    let categoriaEditar = document.getElementById("categoria-editar").value;
    socketClient.emit("editarProducto",{
        id:idEditar,
        nombre:nombreEditar,
        descripcion:descripcionEditar,
        codigo:codigoEditar,
        stock:stockEditar,
        precio:precioEditar,
        categoria:categoriaEditar
    })
}) 
