const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const CONNECTION_URI = process.env.MONGODB_URI || "mongodb+srv://shivakumara:shiva@123@cluster0-6pive.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_URI,{useCreateIndex: true,useNewUrlParser: true})
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