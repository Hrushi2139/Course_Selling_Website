const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require('../db/index');
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
    const title = req.body.title    
    const description = req.body.description
    const price = req.body.price
    const imageLink = req.body.imageLink
    Course.create({
        title:title,
        description:description,
        price:price,
        imageLink:imageLink
    }).then((course)=>{
        res.status(200).json({message:"Course created successfully with id"+course._id});
    })
    .catch(err=>{
        res.status(500).send("Course Not Created");
    }
    );
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find().then((courses)=>{
        res.status(200).json(courses);
    })
});

module.exports = router;