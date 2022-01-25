const mongoose = require('mongoose');

const auth = new mongoose.Schema({
    auth:{
        type: String,
    },
    authMatch:{
        type: String,
    },
    authMatch2: {
        type: String,
    },
    authMatch3:{

    },
})

const auth = mongoose.model('auth', auth);
module.exports = {auth};