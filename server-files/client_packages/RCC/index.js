let cruiseSpeed;
let cruiseEnabled = false;

mp.keys.bind(0x59, true, function() {   // Y Key
    if(mp.players.local.vehicle){
        if(isDriver() === true){
            toggleCruise();
        }
    }
});

function isDriver() {
    if(mp.players.local.vehicle) return mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle;
}

function toggleCruise(){

    if(!cruiseEnabled){
        if(mp.players.local.vehicle.getSpeed() > 0) {
            cruiseEnabled = true;
            cruiseSpeed = mp.players.local.vehicle.getSpeed();
        } else {
            mp.gui.chat.push('You cannot enable cruise control if you are not moving.')
        }
    } else {
        cruiseEnabled = false;
    }
    if (cruiseEnabled == true) 
    {
        mp.gui.chat.push('Cruise Control has been {Green}enabled.')
    }

      else mp.gui.chat.push('Cruise Control has been {Red}disabled')

}

mp.events.add("playerExitVehicle", (player, vehicle) => {
    cruiseEnabled = false;
})

mp.events.add('render', () => {
    if(cruiseEnabled){
        mp.players.local.vehicle.setForwardSpeed(cruiseSpeed);
        if(mp.players.local.vehicle.hasCollidedWithAnything()) return toggleCruise();   // Collision Check
        if(mp.game.controls.isControlPressed(2, 76) || mp.game.controls.isControlPressed(2, 72) || 
        mp.game.controls.isControlJustPressed(2, 32)) return toggleCruise();     //  Brake/Acceleration/ExitVehicle Check
        if(mp.players.local.vehicle.getHeightAboveGround() > 0.75) return toggleCruise(); //  Car in air check
    }
    
});