const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema)



/*
Bro can i get a fix?
 ``` [nodemon] restarting due to changes...
[nodemon] starting `node start server.js`
Connected to mongoose
TypeError: author.Save is not a function ```

Authors js codes:
```
const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All author route
router.get('/', (req,res)=>{
    res.render('authors/index.ejs')
})

// New author route
router.get('/new', (req,res)=>{
    res.render('authors/new.ejs', {author: new Author() })
})

// create author route
router.post('/', (req,res)=>{
    const author = new Author({
        name: req.body.name2
    })

    author.Save((err, newAuthor)=>{
        if(err){
            res.render('/authors/new', {
                author: author,
                errorMessage:'Error creaing author'
            })
        }
        else {
                res.redirect(`authors`)
            }
    })
    res.send(req.body.name2)
    
})

module.exports = router
```
Server.js Codes:

```
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
} 

const express = require('express')      

const app = express()   

const expressLayouts = require('express-ejs-layouts')   

      
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')  
const authorRouter = require('./routes/authors.js')

app.set('view engine','ejs')    

app.set('views', __dirname + '/views')   

app.set('layout', 'layouts/layout')    

app.use(expressLayouts) 

app.use(express.static('public')) 

app.use(bodyParser.urlencoded({ limit: '10mb', extended:false})) 

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection

db.on('error', error=>console.error(error))


db.once('open', ()=> console.log('Connected to mongoose'))

app.use('/', indexRouter) 
app.use('/authors', authorRouter) // in localhost i have to write localhost:3000/authors now to acces authors folders ejses

app.listen(process.env.PORT||3000)
```
author.js codes:
```
const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema)
```
*/