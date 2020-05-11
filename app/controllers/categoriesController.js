const express = require('express')
const Category = require('../models/category')
const Note = require('../models/note')
const router = express.Router()

// categories 
router.get('/', (req, res) => {
    Category.find()
        .then(categories => {
            console.log("categories ", categories)
            res.json(categories)
        })
        .catch(error => {
            console.log(error)
        })
})

// categories show
router.get('/:id', (req, res) => {
    const id = req.params.id
    Promise.all([Category.findById(id), Note.find({category: id})])
        .then(response => {
            res.json({category: response[0],notes: response[1]})
        })
        .catch(error => {
            console.log(error)
        })
})

// categories create
router.post('/', (req,res) => {
    const body = req.body
    const category = new Category(body)
    category.save()
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.json(response)
        })
})

// categories update
router.put('/:id', (req,res) => {
    const body = req.body
    const id = req.params.id
    Category.findByIdAndUpdate(id, {$set: body}, {new: true})
        .then(response => {
            res.json(response)
        })
        .catch(error => {   
            res.json(response)
        })
})

// categories delete
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Category.findByIdAndDelete(id)
        .then(category => {
            console.log("category ", category)
            res.json(category)
        })
        .catch(error => {
            console.log(error)
        })
})

module.exports = router