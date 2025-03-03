const { User }= require('../db/index');
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    let username=req.headers.username;
    let password=req.headers.password;
    User.findOne({
        username:username,
        password:password
    }).then((user)=>{
        if(user){
            next();
        }else{
            res.status(401).send("Unauthorized");
        }
    }
    ).catch((err)=>{
        res.status(500).send("Internal Server Error");
    });
}

module.exports = userMiddleware;