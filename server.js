if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
} // this line must be in the begining

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

app.use(bodyParser.urlencoded({ limit: '10mb', extended:false})) // app.use(bodyParser.urlencoded({ limit: '10mb', extended:false})) must be used before const mongoose = require('mongoose')
// Otherwise it will throw an error while displaying the submitted input to the post route with '/'

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
// options usecreateindex, usefindandmodify are not supported
// my last code was like this: mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }); *And that was giving me mongoose error.
// And the process.env.DATABASE_URL works just as i menion here. It first takes the .env file and that it grabs the DATABASE_URL of that .env file and takes the value that is after equal(=) sign. In our case the value is mongodb://localhost/mybrary
const db = mongoose.connection

db.on('error', error=>console.error(error))


db.once('open', ()=> console.log('Connected to mongoose'))

app.use('/', indexRouter) 
app.use('/authors', authorRouter) // in localhost i have to write localhost:3000/authors now to acces authors folders ejses

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
1. git config --global user.name "yourgitprofilesname"
2. git config --global user.email "you@example.com"   
3.git config --global user.password "Your password" or git config --global user.name "Your Name"
4.git init
5.git commit -m "write anything you want to"

Then create a repository in the github account
And then copy the commands that are available under the or push an existing repository from the command line

for this app it was:
1.First one: git remote add origin https://github.com/LearnerQG/mybrary-2.git
2.2nd One(i didn't use this): git branch -M main
3.Third one: git push -u origin main
And save the links like this.

Then later to **update all the newly added data in your desktops folder you need to do these following steps:
1. git init     
2. git add .   (this one is a must before the 3rd step)
3. git commit -m "anything you can type here" (and here the -m represents the main branch as far as i know. this one is must as well before the 4th step)
4. git push -u origin main

Going step by step about the above updating a file of github topic is a must and doing that will even update the newly added words in an already existed file like this file to the githubs file that is with the same name. So even the server.js's data will be updated.

*/

/*
and after that i created a heroku app without any pipeline.

And then i ran:
1. heroku login
2. heroku git:remote -a mybrary-web-dev6-2
3. git push heroku main
Remember in the third command the master is changed to main as git gives tqo options main and branch.
*/

/* Heroku reveal config vars+ Mongodb atlas part: And then go to heroku apps settings ad then click reveal config vars and in the key field type DATABASE_URL and keep the value field empty for a while
create the mongodb and then click build a cluster then create cluster and then click connect and then put a name in the username and click auto genarate password and copy that password and paste it that value field of reveal config vars of heroku app and then click Create Mongodb user and then click choose a connenction method and then click connect your application and then copy the connection string and paste that before the password of the reveal config vars value field and cut that password and replace it in the<password> and it;s important to remember that the usenname field will be like this <user> if you didn't enter username in the section that appears after clicking the connect of the mongodb atlas part
*/

/*
And i want to to answer this question which is, does using git push heroku main going to push your newly added data of your harddrive to the git and heroku?

the answer is no. The last time i lost all my data of the harddrive and i couldn't recover the new changes of my project that i had on my local disk because i wasn't doing the git add . git commit -m ""AA" and git push -u origin main to get them to github first and then the git push heroku main instead i was scattered with it because I was a beginner. And i learned my lessons and now i get it. I have to forst run the first 4 steps which are


1. git init  
2. git config --global user.email "you@example.com"   
3.git config --global user.password "Your password" or git config --global user.name "Your Name"    
4. git add .   (this one is a must before the 3rd step)
5. and then this command is only run once to push existing local drives file to git, for me it was: "git remote add origin https://github.com/LearnerQG/mybrary-2.git" and this appears after creating a repository to add files to that repository and it varies repository to repository
6. This one is optional: "git branch -M main"
5. git commit -m "anything you can type here" (and here the -m represents the main branch as far as i know. this one is must as well before the 4th step)
6. git push -u origin main
7. heroku login
8. heroku git:remote -a yourappname (You need to store this command for cloning)(and this one is only done once and this command appears under the deploy section of you heroku app dashboard page. after running it once it will not show this command back again. From then on you will be left with this command which is "heroku git:clone -a mybrary-web-dev6-2") so we have "heroku git:clone -a mybrary-web-dev6-2" from then on.
8. and the last one is "git push heroku main"

And only doing the git push heroku main will not make changes to github. So to make changes to github you have to follow git add . git commit -m "AAA" and git push -u origin main

And git push heroku main will not directy update the files to the heroku app. First you have to do git add . then the git commit -m "ADSD"

Done. 

*/

/* what to do when i delete the local drives data. Then if i download the data from github how am i supposed to connect that data to github's already xisting repository?

***[1. 
i. the only method i found was when the start page apears after opening the vs code clicking the git clone repository and from there signing in to the github account.

***********And to sign out click the icon above the settings icon in the bottom left corner.

ii. the other way is pressing ctrl+shift+G and then clicking the threedots(...) and then clicking clone and proceeding from there including signing in to gihub

***********And to sign out click the icon above the settings icon in the bottom left corner.

iii. The very last way that i couldn't make use of is the using of commands in the terminal when cmd is chosen or bash is chosen. The commands were:
  git init 
  git config --global user.name "yourgitprofilesusername"
  git config --global user.email "yourgitprofilesemail"
  git config --global user.password "yourgitprofilespassword"
  git clone thencopythehttpslinkbyopeningthemenuofthedownloadofyourrepository
Then close the vs code and enter that repository hat has been cloned in your local machine or the local drive and then right click there and click open with vs code and from then on you will be able to update the localdrives changes to the githubs files just as before. and remember the way for this was
git add .
git commit -m "Anything"
git push -u origin main

And to push o heroku you need to be careful and you need to remember that heroku git:remote -a mybrary-web-dev6-2 command that dissapears once you deploy rour app to heroku. Then run these two commands:
  
   heroku git:remote -a mybrary-web-dev6-2
   git push heroku main

]

*/


/* How to sign out of the githubs account from the vscode:
***********And to sign out click the icon above the settings icon in the bottom left corner.
*/

/* The common mistakes that occurs

i. The git login using terminal. Sometimes you need to add the 
   git config --global user.name "yourgitprofilesusername"
to also enter the username of git besides the email
   git config --global user.email "yourgitprofilesemail"
and password
   git config --global user.password "yourgitprofilespassword"
of ones github profile.



*/

/* to overcome 