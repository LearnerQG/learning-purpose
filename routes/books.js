const express = require('express')
const router = express.Router()
const Author = require('../models/book.js')

// All Books route
router.get('/',async (req,res)=>{
    res.send('All books')
})

// New Book route
router.get('/new', (req,res)=>{
    res.send('New books')
})

// create Book route
router.post('/',async (req,res)=>{
    res.send('Create books')
})

module.exports = router