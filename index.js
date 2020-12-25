const express = require('express')
const {mongoose} = require('./config/database')
mongoose.set('useFindAndModify', false);
const Router = require('./config/routes')
const path = require('path') 

const categoriesRouter = require('./app/controllers/categoriesController')
const tagsRouter = require('./app/controllers/tagsController')


const cors = require('cors')
const app = express()
// confifugre reading incoming json data
// application level middle ware function
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 6060; 
// const port = 6060
app.use(express.static(path.join(__dirname,"client/build"))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
 	// res.sendFile(path.join(__dirname, 'build', 'index.html'));
}) 

// app listening to port 
app.listen(port, function(){
    console.log('listening to port ', port)
})

console.log('environment ', process.env.NODE_ENV)

// home page
app.get('/' , (req, res) =>{
    res.send('Welcome to noteapp app')
})

// note routes
// app.use('/notes,notesController)
app.use('/api/', Router)
app.use('/api/categories', categoriesRouter)
app.use('/api/tags', tagsRouter)
