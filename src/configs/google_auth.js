import googleStrategy from "passport-google-oauth20";
import config from ".";
import User from "../api/model/user.model"

const googleAuth = (passport) => {
    googleStrategy.Strategy;

    console.log(config);

    passport.use(
        new googleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.COOGLE_CLIENT_SECRET,
            callbackURL: config.GOOGLE_REDIRECT_URL,
        },
        async (accessToken, refreshToken, profile, callback) => {
            // console.log(profile);
            const userObject = {
                googleID :profile.id,
                displayName : profile.displayName,
                gmail : profile.emails[0].value,
                image : profile.photos[0].value,
                firstName : profile.name.givenName,
                lastName :profile.name.familyName,
            };
            let user =await User.findOne({googleID : profile.id});
            
            if (user) {
                return callback(null,user);
            }

            User.create(userObject)
            .then((user) => {
                return callback(null,user);
            })
            .catch((err) => {
                return callback(err.message);
            })

        }
        )
    );

    passport.serializeUser((user, callback) => {
        callback(null, user.id);
    });

    passport.deserializeUser(function(id, callback) {
        User.findById(id, (err, user)=> {
            callback(err,user);
        });
    });
};



export { googleAuth };

