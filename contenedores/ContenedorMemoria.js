class ContenedorMemoria {
    constructor() {
        this.elementos = []
        this.id = 0
    }

    listar(id) {
        try {
            const elementoId = this.elementos.find(x => x.id === id);
            return elementoId;
        } catch (error) {
            console.error("error:", error);
        }
    }

    listarAll() {
        try {
            const data = this.elementos;
            return data;
        } catch (error) {
            console.error("error:", error);
        }
    }

    save(elem) {
        try {
            this.id++
            const el = {...elem, id: this.id}
            this.elementos.push(el);
        } catch (error) {
            console.error("error:", error);
        }
    }

    actualizar(elem, id) {
        try {
            const elementoId = this.elementos.find(x => x.id === id);
            const el = elem;
            const newEl = Object.assign(elementoId, el);
            
            return newEl;
        } catch (error) {
            console.error("error:", error);
        }
    }

    borrar(id) {
        try {
            const elemIndex = this.elementos.findIndex(x => x.id === id);
            this.elementos.splice(elemIndex, 1);
        } catch (error) {
            console.error("error:", error);
        }
    }

    borrarAll() {
        try {
            this.elementos = [];
        } catch (error) {
            console.error("error:", error);
        }
    }
}

module.exports = ContenedorMemoria
