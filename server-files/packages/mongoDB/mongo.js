const mongoose = require('mongoose')//Подключаем библиотеку mongoose для связи с MongoDB

module.exports = async() => {//Экспортируем асинхронную функцию.
    await mongoose.connect('mongodb://localhost:27017/ragemp', {//С помощью метода "connect", подключаемся к MongoDB
        keepAlive: true,//Своего рода постоянное HTTP соединение.
        useNewUrlParser: true,//Отключает предупреждение. MongoDB меняет анализатор URL строки
        useUnifiedTopology: true,//Так же относится к обязательной настройке. Иначе будут предупреждения(soon)
        useFindAndModify: false//Так же относится к обязательной настройке. Иначе будут предупреждения(soon)
    })
    return mongoose//Возвращаем по сути наше подключение в конце функции.
}