const {MongoClient} = require('mongodb');

async function main(){
    const uri = "mongodb+srv://shivakumara:shiva@123@cluster0-6pive.mongodb.net/test?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));

    let user = client.db('note-app').collection('users')
    // const data = {"username":"aishu","email":"aishu@gmail.com","mobile":"9901602848","password":"aishu@123"}

    // user.insertOne(data)
    user.find().toArray(function(error, docs){
        console.log("Found the following records");
        console.log(docs);
        // callback(docs);
    })
};

main().catch(console.error);