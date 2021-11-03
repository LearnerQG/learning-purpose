const express = require('express'); 
const router = express.Router() 

router.get('/', (req,res)=>{ 
    res.render('index.ejs') /* this render renders the ejs file as ejs is our view engine */
}) 

module.exports = router  /***  ***/