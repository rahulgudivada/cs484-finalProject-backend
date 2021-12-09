"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// // const TwitterStrategy = require('passport-twitter').Strategy;
// const GitHubStrategy = require('passport-github').Strategy;
// dotenv.config();
var app = (0, express_1.default)();
// //Middleware
// app.use(express.json())
// app.use(cors({ origin: "http://localhost:3000", credentials: true}))
// app.use(
//   session({
//     secret: "secretcode",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// //Serialize User and De-serialize
// passport.serializeUser((user: any , done: any) => {
//   return done(null, user);
// });
// passport.deserializeUser((user: any, done: any) => {
//   return done(null, user);
// });
// //First Name
// //Last Name
// //ID
// //Google Auth Passport Strategy 
// passport.use(new GoogleStrategy({
//   clientID: `${process.env.GOOGLE_CLIENT_ID}`,
//   clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
//   callbackURL: "/auth/google/callback"
// },
// function(accessToken: any, refreshToken: any, profile: any, cb:any) {
//   // Called on success authentication
//   //databaseFunction.createUser(profile.id, profile.provider, profile.emails[0].value)
//   Users.addUser(profile);
//   cb(null, profile);
// }));
// passport.use(new GitHubStrategy({
//   clientID: `${process.env.GITHUB_CLIENT_ID}`,
//   clientSecret:  `${process.env.GITHUB_CLIENT_SECRET}`,
//   callbackURL: "http://localhost:4000/auth/github/callback"
// },
// function(accessToken: any, refreshToken: any, profile: any, cb:any) {
//   // Called on success authentication
//   //Insert into database
//   cb(null, profile);
// }));
// //Google Authenticate Requests
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile','email']}));
// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('http://localhost:3000');
//   });
// app.get('/auth/github', passport.authenticate('github'));
// app.get('/auth/github/callback', 
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('http://localhost:3000');
//   });
app.get('/', function (req, res) {
    res.send("Hello World");
});
// app.get("/getUser", (req, res) => {
//   res.send(req.user);
// })
app.listen(4000, function () {
    console.log("Server started");
});
//# sourceMappingURL=index.js.map