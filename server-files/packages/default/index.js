mp.events.addCommand("hello", (player,fullText, arg1) => {

    player.outputChatBox('Hey there and welcome ${player.name}')

})

mp.events.addCommand("weapon", (player, fullText, weapon, ammo) => {

    let weaponHash = mp.joaat(weapon);
    player.giveWeapon(weaponHash, parseInt(ammo) || 10000);

})

mp.events.add('playerJoin', async(player) => {
    player.call('showBrowser')
})

//Connect to DB with all the project players
const playerSchema = require('../mongoDB/models/player-schema')
//Create event for when a new player completes the login form
mp.events.add('loginServer', async(player, logData) => {
    //Parse the login data
    logData = JSON.parse(logData)
    //Search for the login input inside our DB
    await playerSchema.findOne({username: logData.userLogin}, function(err, cb) {
        //If such nickname doesn't exist, show error
            if(!cb) player.call('showError', ['textLoginUsername', 'The username does not exist!'])
            //Else, we compare hash password with the input one
            //If they don't match, push error
            cb.comparePassword(logData.passLogin, function(err, isMatch) {
                if(isMatch === true){
                    player.call('hideBrowser')
                } else {
                    player.call('showError', ['textLoginPassword', 'Incorrect Password'])
                }     
            })
        })
});
//Create event for when a player completes register form
mp.events.add('registerServer', async(player, regData) => {
    //Parse the register data
    regData = JSON.parse(regData)
    //Search for the register input inside our DBу
        await playerSchema.findOne({username: regData.userRegister}, function(err,data) {
            //If such nickname exists, show error
            if(data) {
               player.call('showError', ['textRegisterUsername', 'This username already exists!'])
            }  else {
            //Else, we create new DB entry with the data
            //Call event that hides the CEF and teleports the player
            //Password is automatically hashed
                player.call('hideBrowser')
                new playerSchema({
                    username: regData.userRegister,
                    password: regData.passRegister
                }).save()
            }
        
        })
});