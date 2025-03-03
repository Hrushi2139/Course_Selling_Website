// Middleware for handling auth
const { Admin } = require('../db/index');
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username=req.headers.username
    const password=req.headers.password
    Admin.findOne({username:username,password:password}).then((admin)=>{
        if(admin){
            next();
        }else{
            res.status(401).send("Unauthorized");
        }
    }
    ).catch((err)=>{
        res.status(500).send("Internal Server Error");
    });
}

module.exports = adminMiddleware;