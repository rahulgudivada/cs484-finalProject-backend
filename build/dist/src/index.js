"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../database/database"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const User_1 = __importDefault(require("../database/User"));
//OAuth Passport Strategies
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
dotenv_1.default.config();
const app = (0, express_1.default)();
database_1.default.sync().then(() => console.log("Connected to database"));
//Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "https://loving-galileo-f30e7e.netlify.app", credentials: true }));
app.set("trust proxy", 1);
app.use((0, express_session_1.default)({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 //1 week age
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//Serialize User and De-serialize
passport_1.default.serializeUser(function (user, done) {
    done(null, user.id);
});
passport_1.default.deserializeUser(function (id, done) {
    User_1.default.findOne({ where: { 'id': id } }).then(function (user) {
        if (user == null) {
            done(new Error('wrong user id'));
        }
        done(null, user);
    });
});
// //First Name
// //Last Name
// //ID
//Google Auth Passport Strategy 
passport_1.default.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "/auth/google/callback"
}, function (accessToken, refreshToken, profile, cb) {
    User_1.default.findOne({ where: { googleId: profile.id } }).then(async function (user) {
        if (!user) {
            const newUser = new User_1.default({
                googleId: profile.id,
                username: profile.name.givenName
            });
            await newUser.save();
            cb(null, newUser);
        }
        cb(null, user);
    }).catch(function (error) {
        console.log(error);
    });
}));
//GITHUB STRAT
passport_1.default.use(new GitHubStrategy({
    clientID: `${process.env.GITHUB_CLIENT_ID}`,
    clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
    callbackURL: "auth/github/callback"
}, function (accessToken, refreshToken, profile, cb) {
    User_1.default.findOne({ where: { githubId: profile.id } }).then(async function (user) {
        if (!user) {
            const newUser = new User_1.default({
                githubId: profile.id,
                username: profile.username
            });
            await newUser.save();
            cb(null, newUser);
        }
        cb(null, user);
    }).catch(function (error) {
        console.log(error);
    });
}));
// //Google Authenticate Requests
app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile'] }));
app.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: 'https://loving-galileo-f30e7e.netlify.app', session: true }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('https://loving-galileo-f30e7e.netlify.app');
});
app.get('/auth/github', passport_1.default.authenticate('github'));
app.get('/auth/github/callback', passport_1.default.authenticate('github', { failureRedirect: 'https://loving-galileo-f30e7e.netlify.app', session: true }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('https://loving-galileo-f30e7e.netlify.app');
});
app.get('/', (req, res) => {
    res.send("Hello World");
});
app.get("/getUser", (req, res) => {
    res.send(req.user);
});
app.get("/auth/logout", (req, res) => {
    if (req.user) {
        req.logout();
        res.send("done");
    }
});
app.listen(process.env.PORT || 4000, () => {
    console.log("Server started");
});
//# sourceMappingURL=index.js.map