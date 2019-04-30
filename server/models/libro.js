const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const libroSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    paginas: {
        type: Number
    },
    descripcion: {
        type: String
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Autor'
    }
})

const Libro = mongoose.model('Libro', libroSchema, "libro" )
module.exports = {Libro}