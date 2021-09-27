const mongoose = require('mongoose')//Connecting mongoose library to sync with MongoDB

module.exports = async() => {//Export async function
    await mongoose.connect('mongodb://localhost:27017/ragemp', {//Using "connect" to connect to MongoDB
        keepAlive: true,//Keep HTTP connection online
        useNewUrlParser: true,//Disable error and uses new Url parser
        useUnifiedTopology: true,//
        useFindAndModify: false 
    })
    return mongoose//Return the connection to mongoose
}