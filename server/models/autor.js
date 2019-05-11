const mongoose= require('mongoose')

const autorSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    }
})

const Autor = autorSchema.model('Autor', autorSchema, "autor")

module.exports = {Autor}