const express = require('express')
const app = express()
const mongoose = require('mongoose')

const port = 3002

app.use(express.urlencoded({extended: true}))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/library")

const {Libro} = require('./models/libro')

app.get('/libros', (req,res) => {
  Libro.find({}, (err, libros) => { 
    if(err) return res.status(400).send(err)
    res.status(200).send(libros)
  })
})

app.post('/libros/nuevo', (req,res)=>{
  const libro = new Libro(req.body)
  libro.save((err,doc) => {
    if (err) return res.json({success: false, err})
    res.status(200).json({
      success: true
    })
  })
})

app.get('/libros/:id', (req, res) => {
  const libroABuscar = req.params.id
  Libro.find({id: libroABuscar}).then(libros => {
      res.send(libros)
  })
})

// app.post('/libros/:id/editar', (req, res))


app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
  })