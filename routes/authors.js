const express = require('express')
const router = express.Router()
const {Author} = require('../models/author.js')
const Book = require('../models/book')
// All author route
router.get('/',async (req,res)=>{
    let searchOptions = {}
    if (req.query.name3 != null && req.query.name3 !== '') {
       searchOptions.name2 = new RegExp(req.query.name3, 'i')
    }
    try{
        const authors = await Author.find(searchOptions);
        res.render('authors/index.ejs', {
    //This is the comment from the server.js's app.set('view',....)'s comment. {Now in rendering the directory in author.js or in index.js or in any .js of the routes folder, it will not need us to render the whole thing with ../views/... because it has already been declared that the view is coming from /views}
            authors: authors,
            searchOptions: req.query
        } )
    }
    catch{
        res.redirect('/')
    }
    
})
router.get('/random', (req,res)=>{
    res.render('authors/random.ejs', {ra: "asds" })
})


router.get('/afterLogin',async (req,res)=>{
    let searchOptions = {}
  

       searchOptions.name2 = req.query.nameNameLogin;
   let authorLogin = await Author.find({name2:req.query.nameNameLogin})
     // author.auth = req.query.nameNameLogin;
      // await author.save();
    //   let authorAuth = await Author.find({name2: req.query.nameNameLogin});

      const authorAuth = new Author({
          auth:req.query.nameNameLogin,
      });
      await authorAuth.save()
      await authorLogin.save();
    let author = await Author.findById(req.params.id)
    // let authorLoginPopulate =await Author.find(searchOptions).populate('name2')
    if(authorLogin!="")
    {
        // res.redirect(`/authors/authorlogin.id}`)
        res.render('authors/afterLogin.ejs', {
            author4: authorLogin, 
            // authorLoginPopulate:authorLoginPopulate 
        })
    }
    else{
        res.redirect('/')
    }
})
router.get('/login', (req,res)=>{
    res.render('authors/login.ejs')
    if(req.query.nameNameLogin==Author.find(req.query.nameNameLogin)){
    res.redirect('/authors/afterLogin')== false;
    }
})
// New author route
router.get('/new', (req,res)=>{
    res.render('authors/new.ejs'/*, {author: new Author() }*/)
})

// create author route
router.post('/',async (req,res)=>{
    const author0 = new Author({
        name2: req.body.name2
    })
try{
const newAuthor = await author0.save()
res.redirect(`authors/${newAuthor.id}`)
// res.redirect(`authors`)
}
catch{
    // This automaticll catches error if a field stays emty in the form
   res.render('authors/new', {
       author0: author0, 
       errorMessage: 'Error creating Author'
   })
}
})

//Show author
router.get('/:id',async (req, res) => {
try{
    const author = await Author.findById(req.params.id)
 const books = await Book.find({author1 /* this author is the author that is inside the book model written as author1:{type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'} And it must match that name which is author1, to show only the books of one author otherwise it will show all the books of all the author and it must be equal to he name of the author variable which is above this line */: author.id/* And this one is the value of the previous variable. And the create author routes author variable is name author0. So that ones name doesn't matter when its comes to matching that name with author1 of this find or not */}).limit(6).exec()
//  const booksAll = await Author.findById({author1: this.id}).limit(9).exec()
//  const showMore = booksAll - books
    res.render('authors/show', {
     author4: author,
     booksByAuthor: books,
    //  showMore: showMore
 })
}catch (err){
     console.log(err)
res.redirect('/')
}
})

// Edit Author Route
router.get('/:id/edit', async (req, res) => {
       try {
           const author = await Author.findById(req.params.id) /* const because we will not be using it in the catch */
           const authorDetails = await Author.findById(req.params.id).populate('name2').exec() 
            res.render('authors/edit', {
                author: author,             
                authorDetails: authorDetails}
                )
    } catch {
            res.redirect('/authors')
}})

// Update Author Route
router.put('/:id', async (req, res) => {
let author /* let because we will be using it in the catch as well */
try {
    author = await Author.findById(req.params.id)
    author.name2 = req.body.name2;
   // let authorLogin = await Author.find({name2:req.query.nameNameLogin})
       author.auth = req.query.nameNameLogin;
       await author.save();
    await author.save()
    res.redirect(`/authors/${author.id}`)
} catch {
    if(author == null){
        res.redirect('/')
    }else{
        res.render('authors/edit', {
            author: author,
            errorMessage: 'Error Updating Author'
        })
    }
}
})

//Delete author
router.delete('/:id',async (req, res) => {
    let author1
    try{
         author1 = await Author.findById(req.params.id)
        //  const books = await Book.find({author1: author.id})
        await author1.remove()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`/authors`)
        }
        catch (err){
            // This automaticll catches error if a field stays emty in the form
            if(author1==null){
                res.redirect('/')
            }else{
            res.redirect(`/authors/${author1.id}`) 
        } console.log(err)
        }})

module.exports = router