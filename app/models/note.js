const mongoose = require('mongoose')
const Tag = require('./tag')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
    // field configuration
    title: {type: String, required: true},
    body: {type: String, required: true},
    created_at: {type: Date, required: true, default: Date.now()},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    tags: [
        {
            tag: {type: Schema.Types.ObjectId, ref: 'Tag'}
        }
    ]
})

// create model based on schema
const Note = mongoose.model('Note', NoteSchema)


// NoteSchema.post('save', function(){
//     const note = this
//     note.tags.forEach(function(tag){
//         Tag.findById(tag.tag)
//             .then(tag => {
//                 tag.notes.push({note: note._id})
//                 tag.save()
//             })
//     })
// })

module.exports = Note;