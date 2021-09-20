let vector = { x: 212.9087371826172, y: -1397.1019287109375, z: 2700.027587890625} //Вектор камеры
let loginCamera = mp.cameras.new('start', vector, new mp.Vector3(-20,0,0), 40); //Cама камера и начало ее работы.
let loginScreen //Переменная окна браузера
let clientPlayer = mp.players.local //Переменная игрока(может не пригодится, но мало ли :D )

mp.events.add({
    'showBrowser': () => {
        loginCamera.setActive(true);//Устанавливаем камеру
        mp.game.cam.renderScriptCams(true, false, 0, true, false);//Указываем, что камера находится в режиме рендера

        mp.game.ui.displayHud(false)// Убираем худ
        mp.game.ui.displayRadar(false)// Убираем радар

        loginScreen = mp.browsers.new('package://web/login/index.html') //Подключаем CEF часть к переменной loginScreen
        loginScreen.execute("mp.invoke('focus', true)")//Даем возможность использовать курсор
        mp.gui.chat.show(false);//Убираем возможность использовать чат
    },
    'hideBrowser': () => {
        mp.game.cam.renderScriptCams(false, false, 0, true, false);//Убираем рендер, чтобы вернуть камеру к игроку
        loginCamera.setActive(false)//Отключаем камеру

        mp.game.ui.displayHud(true)//Включаем худ
        mp.game.ui.displayRadar(true)//Включаем радар

        loginScreen.execute("mp.invoke('focus', false)")//Убираем курсор у игрока
        mp.gui.chat.show(true)//Даем возможность писать что-либо в чат
        loginScreen.active = false//Отключаем нашу CEF часть.
    }
})