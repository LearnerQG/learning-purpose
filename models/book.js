const mongoose = require('mongoose')
const path = require('path')

const coverImageBasePath = 'uploads/bookCovers'

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
        // instead of actually saving the image in the database we just save the name of the image as string and we save the file on our server in the filesystem. And the filesystem is the left sidebar of vs code that appears when we click the explorer icon or when we type ctrl+shift+E
        type: String,
        required: true
    },
    author1/* remember this must match the first variable of the Book.find({}) inside the show author route meaning the variable before the : of inside the { } of the Book.find({}). And the create author routes author variable is name author0. So that ones name doesn't matter when its comes to matching that name with the first variable iside the Book.find that we were talking about or not. */ :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }

})

bookSchema.virtual('coverImagePath').get(function(){
    if(this.coverImageName!=null){
        return path.join('/', coverImageBasePath, this.coverImageName)
    }
})

module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath