const fs = require('fs')

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async listar(id) {
        try {
            const productos = await this.listarAll();
            const productoId = productos.find(x => x.id == id);
            return productoId;
        } catch (error) {
            console.error(error);
        }
    }

    async listarAll() {
        try {
            const productos = await fs.promises.readFile(this.ruta, 'utf-8');
            const productosArray = JSON.parse(productos);
            return productosArray
        } catch (error) {
            console.error(error);
        }
    }

    async save(obj) {
        let id = 0;
        let objeto;
        let array = [];

        try {
            
            const productos = await this.listarAll();
            
            if(productos) {

                id = 1 + parseInt(productos.length);
                const newObjeto = {...obj, id: id};
                array.push(...productos, newObjeto);  
                objeto = JSON.stringify(array, null, 2);

                await fs.promises.writeFile(this.ruta, objeto, (error)=>{
                    if(error) {
                        throw new Error('error de escritura')
                    }
                    console.log('escritura exitosa')
                    })
                return (objeto.id)
                
            } else { 
                id = 1;
                const newObjeto = {...obj, id: id};
                array.push(newObjeto); 
                objeto = JSON.stringify(array, null, 2);

                await fs.promises.writeFile(this.ruta, objeto, (error)=>{
                    if(error) {
                        throw new Error('error de escritura')
                    }
                    console.log('escritura exitosa')
                    })
                return (objeto.id)
            }

        } catch (error) {
            console.error(error);
        }
    }

    async actualizar(elem, id) {
        try {
            const obj = await this.listar(id);
            const newObj = Object.assign(obj, elem);
            await this.borrar(id);
            await fs.promises.writeFile(this.ruta, newObj, (error)=> {
                if(error) {
                    throw new Error('escritura fallida');
                }
                console.log("actualizacion completada")
            })
            
        } catch (error) {
            console.error(error);
        }
    }

    async borrar(id) {
        try {
            const productos = await this.listarAll();
            const deleteId = productos.filter(x => x.id !== id);
            const productosFiltrados = JSON.stringify(deleteId, null, 2);
            await fs.promises.writeFile(this.ruta, productosFiltrados, (error)=>{
                if(error) {
                    throw new Error('error de borrado')
                }
                console.log('borrado exitoso')
            })

        } catch (error) {
            console.error(error)
        }
    }

    async borrarAll() {
        try {
            await fs.promises.unlink(this.ruta);
            await fs.promises.writeFile(this.ruta, "", (error)=>{
                if(error) {
                    throw new Error('error de borrado')
                }
                console.log('borrado exitoso')
            })
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = ContenedorArchivo