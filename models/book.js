const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    publishDate:{
        type: Date,
        required: true
    },
    pageCount:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    },
    description:{
        type: String,
        required: true
    },
    coverImageName:{
        // instead of actually saving the image in the database we just save the name of the image as string and we save the file on our server in the filesystem
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }

})

module.exports = mongoose.model('Book', bookSchema)