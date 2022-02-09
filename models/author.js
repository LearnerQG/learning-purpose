const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name2:{
        type: String,
        required: true
    },
   email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    auth:{
        type: String,
        required: true,
    } 
})

authorSchema.pre('remove', function(next){
    Book.find({ author1/* so this author1 is the author variable created in the author show route*/: this.id}, (err,books/* this books is a variable and remember it was created in the show author route. Likewise err is a variable */)=>{
        if(err){
            next(err) // next will throw error
        } else if (books.length>0){
            next(new Error('This Author Has Books')) // next will throw another error
        } else {
            next() // now it won't do anything
        }
    })
})
const Author= mongoose.model('Author', authorSchema)
module.exports={Author}