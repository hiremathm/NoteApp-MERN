const express = require('express')
const Tag = require('../models/tag')
const router = express.Router()

router.get('/', (req, res) => {
    Tag.find()
        .then(response => res.json(response))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Tag.findById(id).populate('notes.note',['title'])
        .then(response => res.json(response))
        .catch(error => res.json(error))
    })

router.post('/', (req, res) => {
    const body = req.body
    const tag = new Tag(body)
    tag.save()
        .then(response => res.json(response))
        .catch(error => res.json(error))
})



module.exports = router;