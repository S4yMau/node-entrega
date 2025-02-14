import express from "express";
import productosRouter from "./src/routes/productosRouter.js"
import carritoRouter from "./src/routes/carritoRouter.js"
import path from "path"
import { engine } from "express-handlebars"
import { ProductosM } from "./src/productosM.js";
import { Server } from "socket.io";

const app = express()
//Socket
const serverHttp = app.listen(8080,()=> console.log( "server con 8080"))
const webSocketServer = new Server(serverHttp)

const productos = new ProductosM(path.join(process.cwd(),"src/data/productos.json"))

//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.join(process.cwd(),"src/views"))
//Static
app.use("/",express.static(path.join(process.cwd(),"src","public")))
app.get("/productos", async (req,res)=>{
    let todosLosProductos = await productos.obetenerTodo()
    res.render("home",{
        title: "Node y Express",
        productos: todosLosProductos
    })
})
app.get("/productostiemporeal", async (req,res)=>{
    let todosLosProductos = await productos.obetenerTodo()
    res.render("productosTiempoReal",{
        title: "Node y Express",
        productos: todosLosProductos
    })
}) 

//Express
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//Router
app.use("/productos", productosRouter)
app.use("/carritos", carritoRouter)
//Server

webSocketServer.on("connection", async (socket)=>{
    console.log("Se conecto alguien")
    let todosLosProductos = await productos.obetenerTodo()
    socket.emit("productosIniciales",todosLosProductos)
    socket.on("crearProducto", async (data)=>{
        productos.crear(data)
        let todosLosProductos2 = await productos.obetenerTodo()
        socket.emit("productosIniciales",todosLosProductos2)
    })
    socket.on("borrarProducto", async (data) =>{
        productos.borrarProductoTiempo(data)
        let todosLosProductos3 = await productos.obetenerTodo()
        socket.emit("productosIniciales",todosLosProductos3)
    })
    socket.on("editarProducto", async(data)=>{
        
        productos.actualizarTiempoReal(data, data.id)
        let todosLosProductos4 = await productos.obetenerTodo()
        socket.emit("productosIniciales",todosLosProductos4)
    })
})
