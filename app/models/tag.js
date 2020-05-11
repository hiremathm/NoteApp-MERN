const mongoose = require('mongoose')
const Note = require('./note')

const Schema = mongoose.Schema

const TagSchema = new Schema({
    name: {type: String},
    notes: [
        {
            note: {
                type: Schema.Types.ObjectId, 
                ref: 'Note'
            }
        }
    ]
})

const Tag = mongoose.model('Tag', TagSchema)

TagSchema.post('save', function(){
    const tag = this
    tag.notes.forEach(function(note){
        Note.findById(note.note)
            .then(note => {
                note.tags.push({tag: tag._id})
                note.save()
            })
    })
})
module.exports = Tag;