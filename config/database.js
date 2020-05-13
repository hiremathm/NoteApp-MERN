const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// const CONNECTION_URI = process.env.MONGODB_URI || "mongodb+srv://shivakumara:shiva@123@cluster0-6pive.mongodb.net/test?retryWrites=true&w=majority"

// heroku config:set MONGODB_URI='urlOfYourMongoDatabase'

const CONNECTION_URI =  "mongodb://127.0.0.1:27017/note-app"

mongoose.connect(CONNECTION_URI,{useNewUrlParser: true,useCreateIndex: true})
// it returns promise object, it is asynchronous operation
    .then(()=>{
        console.log("Connected to db")
    })
    .catch(() => {
        console.log("Unable to connect to mongodb")
    })

module.exports = {
    mongoose
}