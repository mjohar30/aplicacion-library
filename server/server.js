const express = require('express')
const app = express()
const mongoose = require('mongoose')

const port = 3002

app.use(express.urlencoded({extended: true}))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/library")

const {Libro} = require('./models/libro')

//Entrega todos los libros
app.get('/libros', (req,res) => {
  Libro.find({}, (err, libros) => { 
    if(err) return res.status(400).send(err)
    res.status(200).send(libros)
  })
})

//Agrega un libro
app.post('/libros/nuevo', (req,res)=>{
  const libro = new Libro(req.body)
  libro.save((err,doc) => {
    if (err) return res.json({success: false, err})
    res.status(200).json({
      success: true
    })
  })
})
//Entrega datos de ese libro por el id
app.get('/libros/:id', (req, res) => {
  const libroABuscar = req.params.id
  Libro.find({id: libroABuscar}).then(libros => {
      res.send(libros)
  })
})
//Actualiza un libro
// app.post('/libros/:id/editar', (req, res) => {
//   const libroABuscar = req.params.id
//   const libroCambios = {req.body}
//   Libro.findOne({id: libroABuscar}, 
//     {$set: {id: {id}}}, {new: true}, (libros) => {
//       if (err) return res.json({success: false, err})
//     res.status(200).json({
//       success: true
//     })
//   }) 
// })

//Borra un libro
app.delete('/libros/:id/borrar', (req, res) => {
  const libroABuscar = req.params.id
  Libro.deleteOne({id: libroABuscar}).then(libros => {
      res.status(200).json({
        success: true
      })
  })
})


app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})