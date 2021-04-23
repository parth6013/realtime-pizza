require('dotenv').config()

const express= require('express')

const app =express()

const ejs= require('ejs')

const path  = require('path')

const expressLayout = require('express-ejs-layouts')

 //app.get('/',homeController().index)

const session = require('express-session')

const PORT = process.env.PORT || 5000

//const PORT = 5000

const mongoose = require('mongoose')

const flash = require('express-flash')

const MonngoDbStore = require('connect-mongo')(session)

const passport = require('passport')

//app.use(express)

//Database connection
const url ='mongodb://localhost/pizza'
mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Database connected...')
}).catch(err =>{
    console.log('connectionn failed ...')
});


//Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

// Session store 

let mongoStore= new MonngoDbStore({
    mongooseConnection : connection,
    collection: 'sessions'
})


//Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore, 
    saveUninitialized: false,
    
    cookie:{maxAge:1000 * 60 * 60 *24} // 24 hrs
}))


//

app.use(flash())
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
//app.use(express)

//Assets



app.use(express.static('public'))

// global middleware
app.use((req,res,next)=>{
    res.locals.session= req.session
    next()
})


// set Template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs') 
app.listen(PORT, () =>{
    console.log('Listening on port 5000')
} )
 

require("./routes/web")(app)



