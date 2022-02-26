const collegeModel = require("../../models/college.model");
const userModel = require("../../models/user.model");
const checkUser = require("../../utils/checkUserExists");

const addStudent = async (req, res) => {
  try {
    const {
      studentEmail,
      studentBranch,
      studentPhone,
      studentAge,
      studentSubject,
    } = req.body;

    if (!studentEmail) {
      res.status(200).json({
        message: "Please provide the data to signup.",
        data: null,
        isError: true,
      });
    } else {
      const user = await checkUser(studentEmail);
      if (
        user &&
        req.user.role === "college_admin" &&
        user.role !== "super_admin" &&
        user.role !== "college_admin" &&
        user.collegeId === undefined
      ) {
        const college = await collegeModel
          .findOne({ collegeAdmin: req.user._id })
          .exec();

        if (college.isApproved) {
          if (college.students.includes(user._id)) {
            res.status(200).json({
              message: "Failed to add the student.",
              data: null,
              isError: true,
            });
          } else {
            await collegeModel
              .findByIdAndUpdate(college._id, {
                $push: { students: user._id },
              })
              .exec();

            await userModel
              .findByIdAndUpdate(user._id, {
                $set: { collegeId: college._id },
              })
              .exec();

            res.status(200).json({
              message: "Successfully added the student.",
              data: null,
              isError: false,
            });
          }
        } else {
          res.status(200).json({
            message: "College is not approved by Admins.",
            data: null,
            isError: true,
          });
        }
      } else {
        res.status(200).json({
          message: "Failed to add the student.",
          data: null,
          isError: true,
        });
      }
    }
  } catch (error) {
    res.status(200).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

module.exports = addStudent;
