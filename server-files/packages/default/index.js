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

//Подключаемся к нашей БД со всеми игроками проекта
const playerSchema = require('../mongoDB/models/player-schema')
//Обрабатываем ивент, когда пользователь отправил форму с данными входа на сервер
mp.events.add('loginServer', async(player, logData) => {
    //Парсим объект данных пользователя
    logData = JSON.parse(logData)
    //Ищем в нашей БД игрока с таким же ником, что ввёл пользователь в форму
    await playerSchema.findOne({username: logData.userLogin}, function(err, cb) {
        //Если такого игрока нет, то в спан выводится ошибка об этом
            if(!cb) player.call('showError', ['textLoginUsername', 'The username does not exist!'])
            //В противном случае мы сравниваем хэш пароля в БД и указаного пользователем.
            //Если что-то пошло не так, выводим в спан ошибку.
            //Заметьте, что мы не подключали здесь библиотеку bcrypt. Все автоматически!
            cb.comparePassword(logData.passLogin, function(err, isMatch) {
                if(isMatch === true){
                    player.call('hideBrowser')
                } else {
                    player.call('showError', ['textLoginPassword', 'Incorrect Password'])
                }     
            })
        })
});
//Обрабатываем ивент, когда пользователь отправил форму с данными регистрации на сервер
mp.events.add('registerServer', async(player, regData) => {
    //Парсим объект данных пользователя
    regData = JSON.parse(regData)
    //Ищем в нашей БД игрока с таким же ником, что ввёл пользователь в форму
        await playerSchema.findOne({username: regData.userRegister}, function(err,data) {
            //Если такой игрок есть, то в спан выводится ошибка об этом
            if(data) {
               player.call('showError', ['textRegisterUsername', 'This username already exists!'])
            }  else {
            //В противном случае мы создаём в БД нового пользователя с данными которые он внес.
            //Так же вызываем ивент, который скроет CEF часть и ТПнет игрока.
            //Заметьте, что мы не подключали здесь библиотеку bcrypt.
            //Пароль будет хэширован автоматически.
                player.call('hideBrowser')
                new playerSchema({
                    username: regData.userRegister,
                    password: regData.passRegister
                }).save()
            }
        
        })
});