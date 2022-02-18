const { Router } = require("express");
const login = require("./controllers/auth/login.auth");
const signup = require("./controllers/auth/signup.auth");
const forgetPassword = require("./controllers/auth/forgetPassword");
const resetPassword = require("./controllers/auth/resetPassword");
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
const getCourse = require("./controllers/courses/getCourse");
const createChapter = require("./controllers/courses/createChapter");
const deleteCourse = require("./controllers/courses/deleteCourse");
const getChapter = require("./controllers/courses/getChapter");
const getLimitedCourses = require("./controllers/courses/getLimitedCourses");
const contactAdmin = require("./controllers/contactAdmin");
const getContact = require("./controllers/getContacts");
const {
  addQuiz,
  getQuiz,
  getAllQuizzes,
} = require("./controllers/courses/quiz");

const router = Router();

router.get("/", (req, res) => {
  res.send("welcome to kconnect!!");
});

// auth routes
router.post("/signup", signup);
router.post("/login", login);

//forget password route
router.put("/forgetPassword", forgetPassword);
router.put("/resetPassword", resetPassword);

//forget password email verification route
router.get("/passwordResetEmailVerification/:verificationToken");

// user routes
router.get("/user", authCheck, getUser);
router.put("/user", authCheck, updateUser);
router.delete("/user", authCheck, deleteUser);

// sign-up email verification route....
router.get("/verify/:id", verify);

router.get("/users", authCheck, getUsers);

router.post("/contact", contactAdmin);
router.get("/contacts", authCheck, getContact);

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
router.post("/chapter", authCheck, createChapter);

router.get("/courses", authCheck, getAllCourses);
router.get("/courses/:limit", getLimitedCourses);
router.get("/course/:courseId", authCheck, getCourse);
router.get("/chapter/:chapterId", authCheck, getChapter);

router.delete("/course/:courseId", authCheck, deleteCourse);

// quiz
router.post("/quiz", addQuiz);
router.get("/quiz/getAllQuizzes", authCheck, getAllQuizzes); //list all quizzes for super_admin
router.get("/quiz/:courseId", getQuiz);

module.exports = router;
