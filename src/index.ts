import express from 'express';
import sequelize from '../database/database';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport'
import User from '../database/User';

//OAuth Passport Strategies
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

dotenv.config();

const app = express();

sequelize.sync().then(() => console.log("Connected to database"));



//Middleware
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true}))
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Serialize User and De-serialize
passport.serializeUser(function(user: any, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id: string, done) {
  User.findOne({ where: {'id': id}}).then(function(user) {
    if(user == null) {
      done(new Error('wrong user id'))
    }
    done(null, user)
  })
});

// //First Name
// //Last Name
// //ID

//Google Auth Passport Strategy 
passport.use(new GoogleStrategy({
  clientID: `${process.env.GOOGLE_CLIENT_ID}`,
  clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
  callbackURL: "/auth/google/callback"
},
function(accessToken: any, refreshToken: any, profile: any, cb:any) {
  User.findOne({ where: { googleId: profile.id}}).then( async function(user){
    if(!user){
      const newUser = new User({
        googleId: profile.id,
        username: profile.name.givenName
      });
      await newUser.save();
      cb(null, newUser)
    }
    cb(null, user)
  }).catch(function(error){
    console.log(error)
  });

}));

//GITHUB STRAT
passport.use(new GitHubStrategy({
  clientID: `${process.env.GITHUB_CLIENT_ID}`,
  clientSecret:  `${process.env.GITHUB_CLIENT_SECRET}`,
  callbackURL: "auth/github/callback"
},
function(accessToken: any, refreshToken: any, profile: any, cb:any) {
  User.findOne({ where: { githubId: profile.id}}).then( async function(user){
    if(!user){
      const newUser = new User({
        githubId: profile.id,
        username: profile.username
      });
      await newUser.save()
      cb(null, newUser);
    }
    cb(null, user);
  }).catch(function(error){
    console.log(error)
  });

}));

// //Google Authenticate Requests

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile']}));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');
  });

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');
  });

app.get('/', (req, res) =>{
  res.send("Hello World")
})  

app.get("/getUser", (req, res) => {
  res.send(req.user);
})

app.get("/auth/logout", (req, res) => {
  if(req.user) {
    req.logout();
    res.send("done")
  }
})

app.listen(process.env.PORT, () => {
  console.log("Server started")
})