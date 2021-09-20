let colshape; // Невидимый объект для маркера начала работы.
let colshapeMarker; // Маркер начала работы.
let trackMarker; // Маркер конечного маршрута.
let trackColshape; // Невидимый объект конечного маршрута.
let showWork; // Используется для взаимодействия с CEF-частью.
let playerLocal = mp.players.local // Переменная с локальными данными игрока (для клиентской стороны)
let workStatus = 0; // Состояние работы: 0 - не работает; 1 - работает.
let muleSpawn = { x: -267.8572692871094, y: 2193.226806640625, z: 130.0386199951172, heading: -118.64833068847656} //Координаты спавна машины для работы.
let trackSpawn = { x: -230.88673400878906, y: 2081.921142578125, z: 138.77877807617188 } //Координаты спавна для маркера разгрузки.
let redColor = [255,0,0,100] //Для удобства вынес красный цвет в переменную, ибо часто используется.

const playerInitWork = (marker) => {
    colshapeSphere = mp.colshapes.newSphere(marker.x, marker.y ,marker.z+1, 2)
    colshapeMarker = mp.markers.new(1, [marker.x+1, marker.y, marker.z+1], 1, {color: redColor});
    mp.peds.new(
        mp.game.joaat('cs_dreyfuss'),
        [marker.x, marker.y ,marker.z+2, 1],
        260.0,
        playerLocal.dimension
    );
}

const workNotify = (msgText) => {
    mp.game.ui.setNotificationTextEntry('STRING');
    mp.game.ui.setNotificationMessage('CHAR_RON', 'CHAR_RON', false, 2, 'New Message', msgText);
};

const startColshape = () => {
    showWork = mp.browsers.new('package://trucker/cef/index.html')
    showWork.execute("mp.invoke('focus', true)")
    mp.gui.chat.activate(false)
    mp.game.graphics.startScreenEffect("ChopVision", 0, true)
}

const beginWork = () => {
    showWork.execute("mp.invoke('focus', false)")
    showWork.active = false
    mp.game.graphics.stopScreenEffect("ChopVision")
    mp.gui.chat.activate(true)
}



const spawnVehiclesForWork = (carName, carSpawn) => {
        mp.vehicles.new(mp.game.joaat(carName), carSpawn, {heading: carSpawn.heading})
}


const setCheckPoint = () => {
    trackColshape = mp.colshapes.newSphere(trackSpawn.x, trackSpawn.y, trackSpawn.z, 3)
    trackMarker = mp.markers.new(1, [trackSpawn.x, trackSpawn.y, trackSpawn.z-2], 3, {color: redColor, visible: true});
    trackBlip = mp.blips.new(431, [trackSpawn.x, trackSpawn.y, trackSpawn.z], {shortRange: false});
    trackBlip.setRoute(true);
}

const vehicleCheck = () => {
    if(!playerLocal.vehicle) {
        workNotify('You cannot make a delivery on foot!')
        return false;
    }
    return true;
}

const clearTrack = () => {
    trackColshape.destroy();
    trackMarker.destroy();
    trackBlip.destroy()
}
const startTrackShape = () => {
    if(!vehicleCheck()) return mp.gui.chat.push("You have to be in the vehicle.")
    clearTrack()
    workStatus = 0
}


mp.events.add('playerInitLogistWork', (markerPos) => {
    playerInitWork(markerPos)
}) 
/////////////////////////////////////////////////////////////
mp.events.add('playerEnterColshape', (colshape) => {
    if( colshape == colshapeSphere ) {
        startColshape()
    }
    if(colshape == trackColshape) {
        startTrackShape()
        workNotify('You already delivered the cargo. Go back!')
    }
}) 
//////////////////////////////////////////////////////////////
mp.events.add('beginWork', () => {
    if(workStatus == 1 ) {
        beginWork()
        workNotify('You already started work!')
    }
    else {
        beginWork()
        spawnVehiclesForWork('mule3', muleSpawn)
        workNotify('Start delivering the cargo!')
        workStatus = 1
    }
}) 
//////////////////////////////////////////////////////////////
mp.events.add('playerEnterVehicle', () => {
    if(workStatus = 1) {
        setCheckPoint()
    }
})