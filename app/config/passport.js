const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

const bcrypt = require('bcrypt')
const user = require('../models/user')

function init(passport){
    passport.use(new LocalStrategy({usernameField:'email'},async (email,password,done)=>{
        // Login 
        // check if email exists
       const user =await User.findOne({email:email})
       if(!user){
           return done(null,false,{message:'No user with this email'})
       }
       bcrypt.compare(password,user.password).then(match=>{
           if(match){
               return done(null,user,{message: 'Logged in successfuly'})
           }
           return done(null,user,{message: 'Wrong username or password'})

       }).catch(err =>{
        return done(null,user,{message: 'Something went wrong'})
       })

    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser((id,done)=>{
        user.findOne({_id:id},(err,user) =>{
            done(err,user)
        })
        
    })

    //req.user
}

module.exports = init