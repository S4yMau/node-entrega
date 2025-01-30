import express from "express";
import productosRouter from "./src/routes/productosRouter.js"
import carritoRouter from "./src/routes/carritoRouter.js"
import path from "path"
const app = express()
app.use(express.static(path.join(process.cwd(),"src","public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/productos", productosRouter)
app.use("/carritos", carritoRouter)
app.listen(8080,()=> console.log(path.join(process.cwd(),"src/data/carritos.json")))

