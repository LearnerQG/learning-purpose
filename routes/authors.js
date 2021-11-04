const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All author route
router.get('/', (req,res)=>{
    res.render('authors/index.ejs', {author1:'man'})
    // writing /views/authors/index.ejs or /views/authors/index.ejs or /authors/index.ejs or /authors/index.ejs or ../authors/index.ejs inside the render will throw an error
    // these ones will not throw the error ../views/authors/index.ejs or authors/index.ejs
})

// New author route
router.get('/new', (req,res)=>{
    res.render('authors/new.ejs', {author: new Author() })
})

// create author route
router.post('/',async (req,res)=>{
    const author = new Author({
        name: req.body.name2
    })
try{
const newAuthor = await author.save()
res.redirect(`authors`)
}
catch{
   res.render('authors/new', {
       author: author,
       errorMessage: 'Error creating Author'
       // writing writing !==null or !===null in errorMessage.ejs throws error. The correct one is !=null
   }) 
}
    // author.save((err, newAuthor)=>{
    //     if(err){
    //         res.render('authors/new', {
    //             author: author,
    //             errorMessage:'Error creaing author'
    //         })
    //     }
    //     else {
    //             res.redirect(`authors`)
    //         }
    // })    
})

module.exports = router