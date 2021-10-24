const { Router } = require("express");
const login = require("./controllers/auth/login.auth");
const signup = require("./controllers/auth/signup.auth");
const createCollege = require("./controllers/college/create.college");
const getUsers = require("./controllers/user/all.user");
const deleteUser = require("./controllers/user/delete.user");
const getUser = require("./controllers/user/get.user");
const updateUser = require("./controllers/user/update.user");
const authCheck = require("./middlewares/auth.md");
const addStudent = require("./controllers/college/addStudent.college");
const createMeeting = require("./controllers/meeting/create.meeting");
const getAllMeetings = require("./controllers/meeting/all.meeting");
const verify = require("./controllers/user/verify.user");
const getMeeting = require("./controllers/meeting/get.meeting");
const deleteMeeting = require("./controllers/meeting/delete.meeting");
const updateMeeting = require("./controllers/meeting/update.meeting");
const deleteCollege = require("./controllers/college/delete.college");
const verifyCollege = require("./controllers/college/verify.college");
const { subscribeToPlan, getPlan } = require("./controllers/college/plans");
const createCourse = require("./controllers/courses/createCourse");
const getAllCourses = require("./controllers/courses/getAllCourses");

const router = Router();

router.get("/", (req, res) => {
  res.send("welcome to kconnect!");
});

// auth routes
router.post("/signup", signup);
router.post("/login", login);

// user routes
router.get("/user", authCheck, getUser);
router.put("/user", authCheck, updateUser);
router.delete("/user", authCheck, deleteUser);
router.get("/verify/:id", verify);

router.get("/users", authCheck, getUsers);

// college routes
router.post("/college", authCheck, createCollege);
router.delete("/college/:collegeId", authCheck, deleteCollege);
router.post("/add-student", authCheck, addStudent);
router.post("/approve/:collegeId", authCheck, verifyCollege);
router.post("/subscribe/:collegeId/:plan", authCheck, subscribeToPlan);
router.get("/plan", authCheck, getPlan);

// meeting routes
router.post("/meeting", authCheck, createMeeting); // create a meeting
router.get("/meetings", authCheck, getAllMeetings); // list all meeting (collegeId)
router.get("/meeting/:id", authCheck, getMeeting); // get a meeting (collegeId, meetingId)
router.put("/meeting/:id", authCheck, updateMeeting); // update a meeting (collegeId, meetingId)
router.delete("/meeting/:id", authCheck, deleteMeeting); // delete a meeting (collegeId, meetingId)

// courses
router.post("/course", authCheck, createCourse);
router.get("/courses", authCheck, getAllCourses);

module.exports = router;
