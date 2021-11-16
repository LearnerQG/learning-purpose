const express = require('express'); 
const Book = require('../models/book.js'); 
const router = express.Router() 

router.get('/', async (req,res)=>{ 
    let books
    try {
        /* writing const here will give error for must */ books = await Book.find().sort({createdAt: 'desc'}).limit(10).exec()
    } catch {
        books = []
    }
    
    res.render('index.ejs', {
        books : books
    }) /* this render renders the ejs file as ejs is our view engine */
}) 

module.exports = router  /***  ***/