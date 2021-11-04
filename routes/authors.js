const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All author route
router.get('/',async (req,res)=>{
    let searchOptions = {}
    // {} is all search when it's inside the Author.find()
    // this {} inside the Author.find({}) is calling all the authors with the name id and all that each author have. But we are storing this inside the searchOptions in the above line. So we are taking all the authors all the informations in the searchOptions if the searchOptions is inside the .find().
    // then we filter the authors name
    if (req.query.name3 != null && req.query.name3 !== '') {
       searchOptions.name /*So i took the name of authors with .name, remember in create route we used name: req.body.name and stored it in the Author() by placing it in a variable called author and then ran author.save() to save it. 
        And if it was searchOptions.name3 it would've always showed all the authors*/   = new RegExp(req.query.name3, 'i')
        // then i'm taking only those authors names that contains the search keywords
        // if i write jo i will get john as a result. That's what the RegExp does

// *** Don't change delete this comment. so what we replace the authors names with regexpied keywords and we search it with the find(). Don't change delete this comment
    }
    try{
        // const authors = await Author.find({})
        const authors = await Author.find(searchOptions)
        // So using searchoptions i can pull out the author
        res.render('authors/index.ejs', {
            authors: authors,
             searchOptions: req.query
            // instead of writing req.query.name3 or searchOptions.name3 i passed the variable like this
        } )
    // writing /views/authors/index.ejs or /views/authors/index.ejs or /authors/index.ejs or /authors/index.ejs or ../authors/index.ejs inside the render will throw an error
    // these ones will not throw the error ../views/authors/index.ejs or authors/index.ejs
    }
    catch{
        res.redirect('/')
    }
    
})

// New author route
router.get('/new', (req,res)=>{
    res.render('authors/new.ejs', {author: new Author() })
})

// create author route
router.post('/',async (req,res)=>{
    const author = new Author({
        name1: req.body.name2
    })
try{
const newAuthor = await author.save()
// res.redirect(`authors/${newAuthor.id}`)
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
    // // res.redirect(`authors/${newAuthor.id}`)
    //             res.redirect(`authors`)
    //         }
    // })    
})

module.exports = router