const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    userId: {type: Number, index: 1},
    userName: String,
    userEmail: String,
    userPassword: String,
    userRole: {type: String, enum: ("Manager", "Employee")}
}, {collection: 'Users', versionKey: false})

const User = model('Users', userSchema);

module.exports = {User};
