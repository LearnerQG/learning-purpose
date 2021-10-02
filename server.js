if (process.env.NODE_ENV !== 'production'){
        require('dotenv').config()
 } 

const express = require('express')      

const app = express()   

const expressLayouts = require('express-ejs-layouts')   

app.set('view engine','ejs')    

app.set('views', __dirname + '/views')   

app.set('layout', 'layouts/layout')    

app.use(expressLayouts) 

app.use(express.static('public'))       

const indexRouter = require('./routes/index')  

app.use('/', indexRouter) 

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
// options usecreateindex, usefindandmodify are not supported
// my last code was like this: mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }); *And that was giving me mongoose error.

const db = mongoose.connection

db.on('error', error=>console.error(error))


db.once('open', ()=> console.log('Connected to mongoose'))

app.listen(process.env.PORT||3000)      


// Softwares: vs code(Link:https://code.visualstudio.com/download), nodejs ( add it to the system environment path and also thenwards go to cmd and write "node --version" Link:https://nodejs.org/en/download/), mongodb(Link: https://www.mongodb.com/try/download/community), git( add it to the system environment path and also thenwards go to cmd and write "git --version" Link:https://git-scm.com/downloads or https://git-scm.com/download/win), heroku cli( Link: https://devcenter.heroku.com/articles/heroku-cli#download-and-install or https://devcenter.heroku.com/articles/heroku-cli)

// Link for heroku: https://dashboard.heroku.com/apps and link for github: https://github.com and link for github repository: https://github.com/Learner625?tab=repositories 

/*  Command Lines:
go to the packkage.json and type 
"start": "node server.js" 
"devStart": "nodemon server.js"

***[ 1."npm init -y"                    
2."npm i express ejs express-ejs-layouts"                        

3.use    " npm install -g nodemon  " instead of " npm i --save-dev nodemon " 
 
and remove the quotes  and lastly to start nodemon type to execute the start script:                 4."nodemon start"
or "npm run devStart"                    ]***

Start script list with mongoose:
https://stackoverflow.com/questions/33879896/how-to-execute-the-start-script-with-nodemon

1. "nodemon --exec npm start" Ow. this does show error:cannot be 
loaded because running scripts is disabled on this system
2. "npm start"
3. "npm run start"
4. nodemon [options] --exec 'npm start -s' Ow. this does show error:cannot be 
loaded because running scripts is disabled on this system
5. "npx nodemon"

for mongoose: "npm i mongoose" or for latest mongoose"npm i -g mongoose@latest"

Then we have this one which is very crucial "npm i --save-dev dotenv"

*/

/* start script with mongoose will not work with **********powershell*/

// It will only work with {cmd & bash}

/* localhost:3000 will not work without ***liveserver */

/* sending the file to github:
  1. git config --global user.email "you@example.com"   
  2.git config --global user.password "Your password" or git config --global user.name "Your Name"
    3.git init
    4.git commit -m "write anything you want to"

    Then create a repository in the github account
    And then copy the commands that are available under the or push an existing repository from the command line

    for this app it was:
1.First one: git remote add origin https://github.com/LearnerQG/mybrary-2.git
2.2nd One(i didn't use this): git branch -M main
3.Third one: git push -u origin main
  And save the links like this.
  
Then later to update all the newly added data in your desktops folder you need to do these following steps:
1. git init     
2. git add .   (this one is a must)
3. git commit -m "anything you can type here" (and here the -m represents the main branch as far as i know)
4. git push -u origin main

And doing that will even update the new newly added words in an already existed file like this file to the githubs file that is with the same name as this file.So even the server.s's data will be updated.

  */
