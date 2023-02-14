const mongoose = require('mongoose');
const User = mongoose.model('User');
const Password = require('../utils/passwords')
const jwt = require('../utils/jwt')

module.exports['addNewUser'] = async function addNewUser({ name, password, email, phoneNo }) {
    try {
        if (!email || !password || !name || !phoneNo) {
            throw new Error("please add all fields");
        }
        const savedUser = await User.findOne({ email: email })
        if (savedUser) {
            throw new Error("User with this email address exists");
        }
        else {
            const hashedpassword = await Password.hashPassword(password);
            const user = new User({
                email,
                password: hashedpassword,
                name,
                phoneNo
            })
            return await user.save()
        }

    }
    catch (e) {
        throw new Error(e)
    }
}

module.exports['getUser'] = async function getUser({ password, email }) {
    try {
        if (!email || !password) {
            throw new Error("please add all fields");
        }
        const savedUser = await User.findOne({ email: email });
        if (!savedUser) {
            throw new Error("invalid Email or password");
        }
        const matched = await Password.matchPassword(savedUser.password, password);
        if (!matched) throw new Error('invaid password');
        const token = await jwt.sign({ email: email, password, password })
        const user = {
            password,
            email,
            token
        }
        return user;
    }
    catch (e) {
        throw new Error(e)
    }
}