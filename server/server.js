const express = require('express')
const app = express()
const mongoose = require('mongoose')

const port = 3002

app.use(express.urlencoded({extended: true}))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/library")

const {Libro} = require('./models/libro')
const {Autor} = require('./models/autor')

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
app.put('/libros/:id/editar', (req, res) => {
  Libro.findOneAndUpdate(req.params.id, req.body).then(() => {
    libro.save((err,doc) => {
      if (err) return res.json({success: false, err})
      res.status(200).json({
        success: true
    })
    })
  })
})

//Borra un libro
app.delete('/libros/:id/borrar', (req, res) => {
  const libroAEliminar = req.params.id
  Libro.deleteOne({id: libroAEliminar}).then(libros => {
      res.status(200).json({
        success: true
      })
  })
})

app.get('/autores', (req,res) => {
  Autor.find({}, (err, autores) => {
    if (err) return res.status(400).send(err)
    res.status(200).send(autores)
  })
})

app.post('/autores/nuevo', (req,res) => {
  const autor = new Autor(req.body)
  autor.save((err,doc) => {
    if (err) return res.json({success: false, err})
    res.status(200).json({
      success: true
    })
  })
})

app.get('/autores/:id', (req, res) => {
  const autorABuscar = req.params.id
  Autor.find({id: autorABuscar}).then(autor => {
      res.send(autor)
  })
})

app.delete('/autores/:id/borrar', (req,res) => {
  const autorAEliminar = req.params.id
  Autor.deleteOne({id: autorAEliminar}).then(
    res.status(200).json({
      success:true
    })
  )
})

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})