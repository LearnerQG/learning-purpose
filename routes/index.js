const express = require('express'); 
const router = express.Router() 

router.get('/', (req,res)=>{ // and this rendered file is going to prepend further to / in path after the last directory which is the directory given in the app.use inside the ' ' 
    res.render('index.ejs') /* this render renders the ejs file as ejs is our view engine */
}) 

router.get('/main',(req,res)=>{ // so in this case i have to further specify the directory of url to /main to access main.ejs after specifying till the directory of the directory of app.use section for this index.js which is right now / as / is inside the ''
    // res.send('Hello World');
    res.render('main.ejs')  /* this render renders the ejs file as ejs is our view engine */
    }) 

module.exports = router  /***  ***/