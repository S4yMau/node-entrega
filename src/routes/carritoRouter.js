import { Router } from "express";
import { carritoM } from "../carritoM.js";
const router = Router()
router.post("/", async (req,res)=>{
    try {
        res.json(await carritoM.crearCarrito())
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
})
router.get("/:idCarrito", async (req,res) =>{
    try {
        const {idCarrito} = req.params
        res.json(await carritoM.obtenerCarritoId(idCarrito))
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
})
router.post("/:idCarrito/productos/:idProductos", async (req,res) =>{
    try {
        const {idProducto} = req.params
        const {idCarrito} = req.params
        const respuesta = await carritoM.guardarProductoEnCarrito(idCarrito,idProducto)
        res.json(respuesta)
    } catch (error) {
        res.status(500).json({mensaje: error.mensaje})
    }
})
export default router