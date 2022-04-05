const authenticate = (req , res, next) => {

    if (req.isAuthenticated()) {
        next();
    }else{
        return res.send("<h2>User is not Authenticated in the Server</h2>")
    }
}

export {authenticate};