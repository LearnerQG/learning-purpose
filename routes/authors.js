const express = require('express')
const router = express.Router()
const Author = require('../models/authorcopy.js')

// All author route
// router.get('/',async (req,res)=>{
//     let searchOptions = {}
//     if (req.query.name3 != null && req.query.name3 !== '') {
//        searchOptions.name = new RegExp(req.query.name3, 'i')
//     }
//     try{
//         const authors = await Author.find(searchOptions)
//         res.render('authors/index.ejs', {
//             authors: authors,
//              searchOptions: req.query
//         } )
//     }
//     catch{
//         res.redirect('/')
//     }
    
// })

// experiment author route
router.get('/',async (req,res)=>{
    try{
const authors = await Author.find({})
res.render('authors/index',{
    authors:authors
})
    }
    catch{
res.redirect(`/`)
    }
})

// New author route
router.get('/new', (req,res)=>{
    res.render('authors/new.ejs'/*, {author: new Author() }*/)
})

// create author route
router.post('/',async (req,res)=>{
    const author = new Author({
        name: req.body.name2
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
   }) 
}
})

module.exports = router