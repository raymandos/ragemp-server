const mongo = require('./mongo')//Экспортируем функцию

//Используя встроенный ивент загрузки пакетов, подключаем нашу БД ко всему проекту!
mp.events.add('packagesLoaded', async() => {
    await mongo()
})