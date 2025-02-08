import fs from "node:fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
class ProductosM{
    constructor(path){
        this.path = path
    }
    async obetenerTodo(){
        try {
            
            if (fs.existsSync(this.path)) {
                const productos = await fs.promises.readFile(this.path, "utf-8")
                return JSON.parse(productos)
            } else {
                return []
            }
        } catch (error) {
            throw new Error(error.mensaje)
        }
    }
    async crear (objeto){
        try {
            console.log(this.path);
            const producto = {
                id: uuidv4(),
                status: true,
                ...objeto,
            }
            console.log(producto);
            
            const productos = await this.obetenerTodo()
            productos.push(producto)
            await fs.promises.writeFile(this.path, JSON.stringify(productos))
            return producto
        } catch (error) {
            throw new Error(error.mensaje)
        }
    }
    async obtenerId(id){
        try {
            const productos = await this.obetenerTodo()
            const producto = productos.find((producto) => producto.id == id)
            if (!producto) {
                throw new Error("Prodcuto no encontrado")
            }
            return producto
        } catch (error) {
            throw new Error(error.mensaje)
        }
    }
    async actualizar(objeto, id){
        try {
            const productos = await this.obetenerTodo()
            let producto = await this.obtenerId(id)
            producto = {...producto, ...objeto}
            const array = productos.filter((producto)=> producto.id == id)
            array.push(producto)
            await fs.promises.writeFile(this.path, JSON.stringify(array))
            return producto
        } catch (error) {
            throw new Error(error.mensaje)
        }
    }
    async borrar (id){
        try {
            const producto = await this.obtenerId(id)
            const productos = await this.obetenerTodo()
            const array = productos.filter ((producto)=> producto.id ==id)
            await fs.promises.writeFile(this.path,JSON.stringify(array))
            return producto
        } catch (error) {
            throw new Error(error.mensaje)
        }
    }
    async borrarTodo(){
        try {
            const productos = await this.obetenerTodo()
            if (!productos.length > 0) {
                throw new Error("Producto se encuentra vacio")
            }
            await fs.promises.unlink(this.path)
        } catch (error) {
            throw new Error(error.mensaje)
        }
    }
}
export const productosM = new ProductosM(path.join(process.cwd(),"src/data/productos.json"))