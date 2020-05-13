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
const port = process.env.PORT || 3006; 
// const port = 3006
app.use(express.static(path.join(__dirname,"client/build"))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
}) 

// app listening to port 
app.listen(port, function(){
    console.log('listening to port ', port)
})

// home page
app.get('/' , (req, res) =>{
    res.send('Welcome to noteapp app')
})

// note routes
// app.use('/notes,notesController)
app.use('/', Router)
app.use('/categories', categoriesRouter)
app.use('/tags', tagsRouter)