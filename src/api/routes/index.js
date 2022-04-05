import { authenticate } from "../middleware/auth_middleware";

const routesInit = (app, passport) => {
    app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
    "/auth/google/callback", 
    passport.authenticate("google", { 
        failureRedirect: "/login",
        successRedirect: "/user",
    }),
        
        (req, res)=> {
            console.log("User Authenticated!")
            // res.redirect('/');
        }
    );
    app.get("/test", authenticate, (req, res) => {
        res.send("<h2>User authenticated</h2>");
    });;   
}

export {routesInit}