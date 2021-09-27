const mongoose = require('mongoose')//Connect mongoose module
const bcrypt = require('bcrypt')//Connect bcrypt module 
//Create Schema object with the necessary fields
const Schema = mongoose.Schema({
    username: String,
    password: String,
})
//If a new DB is created, password will be automatically hashed
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
//Create method for validation
//Between hashed password and entered password
Schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}
//Export the schema to DB
module.exports = mongoose.model('player-schema', Schema)