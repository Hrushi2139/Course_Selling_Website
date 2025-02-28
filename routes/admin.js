const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require('../db/index');
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    Admin.create({
        username:username,
        password:password
        
    }).then((admin)=>{
        res.status(200).json({message:"Admin created successfully"});
    })
    .catch((err)=>{
        res.status(500).send("Admin Not Created");
    });

    /*
    if async
     await Admin.create({
        username:username,
        password:password
        
    }).then((admin)=>{
        res.status(200).json({message:"Admin created successfully"});
    })
    */
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;