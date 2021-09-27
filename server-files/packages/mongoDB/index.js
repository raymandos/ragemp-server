const mongo = require('./mongo')//Export function

//Connecting and syncing the DB to the project
mp.events.add('packagesLoaded', async() => {
    await mongo()
})