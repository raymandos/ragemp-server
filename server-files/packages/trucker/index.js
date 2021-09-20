const markerPos = {x: -263.631591796875, y: 2195.6708984375, z: 128.47988891601562}
mp.events.add('playerReady', (player) =>
{
    player.call('playerInitLogistWork', [markerPos]);
})

mp.events.addCommand('sp', (player) => {
    const {position} = player.vehicle
    console.log(`{ x: ${position.x}, y: ${position.y}, z: ${position.z}, heading: ${player.vehicle.rotation.z}}`)
})