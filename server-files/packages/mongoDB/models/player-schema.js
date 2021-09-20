const mongoose = require('mongoose')//Подключаем модуль mongoose(подключение к mongoDB)
const bcrypt = require('bcrypt')//Подключаем модуль bcrypt(хэширование)
//Создаём объект схемы и передаём в него необходимые значения, указывая типы этих данных.
const Schema = mongoose.Schema({
    username: String,
    password: String,
})
//Если будет создаваться новая БД, то пароль в ней будет сразу хэширован автоматически.
Schema.pre('save', function(next) {
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 10,(err,passwordHash) => {
        if(err)
            return next(err)
        this.password = passwordHash
        next()
    })
})
//Создание собственного метода для своего рода валидации
//Хэшированнного пароля и пароля введенного пользователем
Schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}
//Экспортирование нашей схемы в БД
module.exports = mongoose.model('player-schema', Schema)