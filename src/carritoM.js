import fs from "fs"
import path from "path"
import {productosM} from "./productosM.js"

class CarritoM {
    constructor(path) {
        this.path = path
    }
    async  obtenerTodoCarrito() {
        try {
            if (fs.existsSync(this.path)) {
                const carritos = await fs.promises.readFile(this.path, "utf-8")
                const carritosJSON = JSON.parse(carritos)
                return carritosJSON
            } else {
                return []
            }
        } catch (error) {
            throw new Error(error)
        }
    }
    async  crearCarrito() {
        try {
            const carrito = {
                id: "a1",
                productos:[]
            }
            const carritosArchivo = await this.obtenerTodoCarrito()
            carritosArchivo.push(carrito)
            await fs.promises.writeFile(this.path, JSON.stringify(carritosArchivo))
            return carrito
        } catch (error) {
            throw new Error(error)
        }
    }
    async obtenerCarritoId(id){
        try {
            const carritos = await this.obtenerTodoCarrito()
            return carritos.find((carrito)=> carrito.id == id)
        } catch (error) {
            throw new Error(error)
        }
    }
    async guardarProductoEnCarrito(idCarrito,Idproducto){
        try {
            const productoExistente = await productosM.ObtenerId(Idproducto)
            if (!productoExistente) {
                throw new Error("El producto no existe")
            }
            let carritosArchivo = await this.obtenerTodoCarrito()
            const carritoExistente = await this.obtenerCarritoId(idCarrito)
            if (!carritoExistente) {
                throw new Error("El carrito no existe")
            }
            const existeProductoEnCarrito = carritoExistente.productos.find((prducto)=> productoExistente.id == Idproducto)
            if (!existeProductoEnCarrito) {
                const producto = {
                    id: Idproducto,
                    cantidad: 1
                }
                carritoExistente.productos.push(producto)
            } else {
                existeProductoEnCarrito.cantidad += 1
            }
            const actualizarCarritos = carritosArchivo.map((carrito)=>{
                if (carrito.id == idCarrito) {
                    return carritoExistente
                }
                return carrito
            })
            await fs.promises.writeFile(this.path, JSON.stringify(actualizarCarritos))
            return carritoExistente
        } catch (error) {
            throw new Error(error)
        }
    }
}
export const carritoM = new CarritoM(path.join(process.cwd(), "src/data/carritos.json"))