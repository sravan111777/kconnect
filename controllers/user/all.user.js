const userModel = require("../../models/user.model");
const collegeModel = require("../../models/college.model");

const getUsers = async (req, res) => {
  try {
    const { _id, isSuperAdmin, role } = req.user;
    if (isSuperAdmin) {
      const students = await userModel
        .find({ role: "student" })
        .select("fullName email registeredAt role collegeId")
        .exec();

      const collegeInfo = await collegeModel.find().exec();

      let colleges = [];

      for (let college of collegeInfo) {
        const {
          _id,
          collegeName,
          collegeEmail,
          collegeAdmin,
          students,
          isApproved,
        } = college;

        const admin = await userModel.findById(collegeAdmin, "fullName").exec();

        colleges.push({
          id: _id,
          collegeName,
          collegeEmail,
          adminName: admin.fullName,
          students,
          isApproved,
        });
      }

      res.status(200).json({
        message: "Successfully fetched all users.",
        data: { students, colleges },
        isError: false,
      });
    } else if (role == "college_admin") {
      const collegeAdmin = await collegeModel
        .findOne({ collegeAdmin: _id })
        .exec();

      if (collegeAdmin == null) {
        res.status(200).json({
          message: "No users available.",
          data: null,
          isError: true,
        });
      } else {
        const collegeId = collegeAdmin._id;

        const users = await userModel
          .find({ collegeId })
          .select("fullName email registeredAt role collegeId")
          .exec();

        if (users.length === 0) {
          res.status(200).json({
            message: "No users available.",
            count: users.length,
            data: null,
            isError: true,
          });
        } else {
          res.status(200).json({
            message: "Successfully fetched the users.",
            count: users.length,
            data: users,
            isError: false,
          });
        }
      }
    } else {
      res.status(200).json({
        message: "Not authorized to get users.",
        data: null,
        isError: true,
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

module.exports = getUsers;
