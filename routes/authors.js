const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All author route
router.get('/', (req,res)=>{
    res.render('authors/index.ejs')
    // writing /views/authors/index.ejs or /views/authors/index.ejs or /authors/index.ejs or /authors/index.ejs or ../authors/index.ejs or will throw an error
    // these ones will not throw the error ../views/authors/index.ejs or authors/index.ejs
})

// New author route
router.get('/new', (req,res)=>{
    res.render('authors/new.ejs', {author: new Author() })
    res.send("author.name")
})

// create author route
router.post('/', (req,res)=>{
    const author = new Author({
        name: req.body.name
    })
    res.send(req.body.name2)
    
})

module.exports = router