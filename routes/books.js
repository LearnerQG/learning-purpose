const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Book = require('../models/book.js')
const uploadPath = path.join('public', Book.coverImageBasePath)
const {Author}= require('../models/author.js')
const imageMimeTypes = ['image/png', 'image/png', 'image/png']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req,file, callback) => {
        callback( null, imageMimeTypes.includes(file.mimetype) )
    }
})
// All Books route
router.get('/', async (req, res)=>{
let query = Book.find()
if(req.query.title3!= null && req.query.title3!==''){
    query = query.regex('title', RegExp(req.query.title3, 'i'))
}
if(req.query.publishedBefore!=null && req.query.publishedBefore!== ''){
    query = query.lte('publishDate', req.query.publishedBefore)
}
if(req.query.publishedAfter!=null && req.query.publishedAfter!== ''){
    query = query.gte('publishDate', req.query.publishedAfter)
}
    try{
        const books = await query.exec()
res.render('books/index', {
    books: books,
    searchOptions: req.query
})
    }catch{
res.redirect('/')
    }
})

// New Book route
router.get('/new',async (req,res)=>{
    renderNewPage(res, new Book()/* So when i wrote new Book() in the second parameter of the renderNewPage function in this new book route what happened is the value of the book here became new Book() and it acted as const book = new Book() */)
})

// create Book route
router.post('/', upload.single('cover'), async (req,res)=>{
   const fileName = req.file != null ? req.file.filename : null
const book = new Book({
    title: req.body.title2,
    author1: req.body.author3,
    publishDate: new Date(req.body.publishDate2),
    pageCount: req.body.pageCount2,
    coverImageName: req.body.coverImageName2
    // fileName
    ,
    description: req.body.description2
})
try{
const newBook = await book.save()
// res.redirect(`books/${newBook.id}`)
res.redirect(`books`)
}catch (e){
    if (book.coverImageName!=null){
        removeBookCover(book.coverImageName /* So when i wrote new Book() in the second parameter of the renderNewPage function in this new book route what happened is the value of the fileName in the main fucntion which is below became book.coverImageName and it acted as const fileName = book.coverImageName */)
    }

        // This catch automatically catches error if a field stays emty in the form
    renderNewPage(res, book /* this reffers the existing book that has been defined in this create new route with const and not the new Book() of the new Book route*/, true)
    console.log(e)
}
})

function removeBookCover(fileName){
        fs.unlink(path.join(uploadPath, fileName), err => {if (err) console.error(err)})
}

async function renderNewPage/* this renderNewPage is called identifier */(res, book /* So when i wrote new Book() in the second parameter of the renderNewPage function in the new book route iwhat happened is the value of the book here became new Book() and it acted as const book = new Book() */, hassError = false) {
try{
    // const book =await new Book() // this mustn't be here
    searchOptions ={}
    const authors = await Author.find(searchOptions)
    const params /* we store the {....} of res.render('',{}) that was in the create route of the authors.js of the routes folder */ = {
        book: book,
        authors: authors
    }
    if (hassError /* this hasError is by default false but in render(,,true) in some other place we will make it true*/) {params.errorMessage /* So this errorMessage gets included by this action params.errorMessage inside the params = {
        book: book,
        authors: authors
    } as params = {
        book: book,
        authors: authors,
        errorMessage: 'Error Creating Author'
    } as after the = sign after this comment we wrote 'Error Creating Author' */ = 'Error Creating Book'}
    res.render('books/new',
        params /* in here it will not be inside { } because it itself has the {....} */
    )
    }catch (x) {
    res.redirect('books')
    console.log(x)
    }
}

module.exports = router