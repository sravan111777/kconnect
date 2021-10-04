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

router.get("/users", authCheck, getUsers);

// college routes
router.post("/college", authCheck, createCollege);
router.post("/add-student", authCheck, addStudent);

module.exports = router;
