const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// const CONNECTION_URI = process.env.MONGODB_URI || "mongodb+srv://shivakumara:shiva@123@cluster0-6pive.mongodb.net/note-app?retryWrites=true&w=majority"

const CONNECTION_URI = "mongodb+srv://shivakumara:shiva@123@cluster0-6pive.mongodb.net/note-app?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URI,{useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true})
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


// const {MongoClient} = require('mongodb');

// async function main(){
//     const uri = "mongodb+srv://shivakumara:shiva@123@cluster0-6pive.mongodb.net/test?retryWrites=true&w=majority";

//     const client = new MongoClient(uri);
 
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);

// module.exports = {
//     MongoClient
// }
