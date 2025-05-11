const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "/public");
const session = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

// Setup
app.use(express.static(assetsPath));

// session
app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 //ms
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000, //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    ) 
}));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening to on PORT: ${PORT}`);
})
