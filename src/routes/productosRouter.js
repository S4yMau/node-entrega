import { Router } from "express";
import { productosM } from "../productosM.js";
const router = Router()
router.get("/",async(req,res)=>{
    try {
        const productos = await productosM.obetenerTodo()
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({menssage: error.menssage})
    }
})
router.get("/:id", async (req,res)=>{
    try {
        const {id} = req.params
        const producto = await productosM.obtenerId(id)
        res.status(200).json(producto)
    } catch (error) {
        res.status(404).json({mensaje: error.mensaje})
    }
})
router.post("/",async(req,res)=> {
    try {
        const producto = await productosM.crear(req.body)
        res.status(201).json(producto)
    } catch (error) {
        res.status(500).json({mensaje: error.mensaje})
    }
})
router.delete("/",async(req,res)=>{
    try {
        await productosM.borrarTodo()
        res.json({mensaje:"todos los productos borrados"})
    } catch (error) {
        res.status(500).json({mensaje: error.mensaje})
    }
})
router.delete("/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const productoBorrar = await productosM.borrar(id)
        res.status(200).json({mensaje:`Producto ID: ${productoBorrar.id} borrado correctamente`})
    } catch (error) {
        res.status(500).json({mensaje: error.mensaje})
    }
})
router.put("/:id"),async(req,res)=>{
    try {
        const {id} = req.params
        const productoActualizar= await productosM.actualizar(req.body, id)
        res.status(200).json(productoActualizar)
    } catch (error) {
        res.status(500).json({mensaje: error.mensaje})
    }
}
export default router