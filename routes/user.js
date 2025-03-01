const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require('../db/index');

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password
    User.create({
        username:username,
        password:password
    }).then((user)=>{
        res.status(200).json({message:"User created successfully"});
    })
    .catch((err)=>{
        res.status(500).send("User Not Created");
    });

});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find().then((courses)=>{
        res.status(200).json(courses);
    })
    .catch(err=>{
        res.status(500).send("Courses Not Found");
    });

});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    Course.findById(courseId).then((course)=>{
        if(course){
            User.updateOne({
                _id:req.headers.userid},
                {$push:{purchasedCourses:courseId}}
            ).then(()=>{
                res.status(200).send("Course purchased successfully");
            })
            .catch((err)=>{
                res.status(500).send("Course not purchased");
            });
        }
    }
    ).catch((err)=>{
        res.status(500).send("Course not found");
    });
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    const _id=req.headers.userid;
    User.findById(_id).then((user)=>{
        Course.find({
            '_id':{$in:user.purchasedCourses}
        }).then((courses)=>{
            res.status(200).json(courses);
        })
        .catch((err)=>{
            res.status(500).send("Courses not found");
        });
    })
});

module.exports = router