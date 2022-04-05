import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import logger from "./utils/logger";
import config from "./configs";
import { connect } from "./utils/databaseConnection";
import { googleAuth } from "./configs/google_auth";
import { routesInit } from "./api/routes"
import MongoStore from "connect-mongo";

const app = express();
const PORT = process.env.PORT || "5001"



app.use(cors());
app.use(express.json({limit : "20mb"}));
app.use(
    session({
        secret : config.SESSION_SECRET,
        resave : false,
        saveUninitialized : false,
        store : MongoStore.create({mongoUrl : config.DB_CONNECTION_STRING}),
        cookie : {
            secure : false,
            expires : new Date(Date.now() + 10000),
            maxAge : 10000,
        },
    })
);
    
app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req, res, next) => {
    res.send("<a href='http://localhost:5001/auth/google'>login with google</a>");
    next();
})

app.listen(PORT , () => {
    logger.info(`Server is running on PORT ${PORT}`);
    connect();
    routesInit(app, passport);
    googleAuth(passport);
});
