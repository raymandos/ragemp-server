let vector = { x: 212.9087371826172, y: -1397.1019287109375, z: 2700.027587890625} //Camera vector
let loginCamera = mp.cameras.new('start', vector, new mp.Vector3(-20,0,0), 40); //The camera itself
let loginScreen //The login screen
let clientPlayer = mp.players.local //Player client

mp.events.add({
    'showBrowser': () => {
        loginCamera.setActive(true);//Setting up the camera
        mp.game.cam.renderScriptCams(true, false, 0, true, false);//Place the camera in render state

        mp.game.ui.displayHud(false)// Disabling hud
        mp.game.ui.displayRadar(false)// Disabling radar

        loginScreen = mp.browsers.new('package://web/login/index.html') //Connecting CEF to the login screen
        loginScreen.execute("mp.invoke('focus', true)")//Allow using cursor
        mp.gui.chat.show(false);//Disabling chat
    },
    'hideBrowser': () => {
        mp.game.cam.renderScriptCams(false, false, 0, true, false);//Disabling render and returning camera to player
        loginCamera.setActive(false)//Disabling camera

        mp.game.ui.displayHud(true)//Enabling hud
        mp.game.ui.displayRadar(true)//Enabling radar

        loginScreen.execute("mp.invoke('focus', false)")//Disabling cursor
        mp.gui.chat.show(true)//Enabling chat
        loginScreen.active = false//Turning off the CEF part
    }
})