const userModel = require("../../models/user.model");
const collegeModel = require("../../models/college.model");

const getUsers = async (req, res) => {
  try {
    const { _id, isSuperAdmin, role } = req.user;
    if (isSuperAdmin) {
      const users = await userModel.find().exec();
      res.status(200).json({
        message: "Successfully fetched the data",
        code: 200,
        data: users,
        isError: false,
      });
    } else if (role == "college_admin") {
      // TODO: work here!
      const collegeAdmin = await collegeModel
        .findOne({ collegeAdmin: _id })
        .exec();

      const collegeId = collegeAdmin._id;

      const users = await userModel.find({ collegeId }).exec();

      if (users.length === 0) {
        res.status(200).json({
          message: "No students available",
          code: 200,
          data: null,
          isError: false,
        });
      } else {
        res.status(200).json({
          message: "Successfully fetched the data",
          code: 200,
          data: users,
          isError: false,
        });
      }
    } else {
      res.status(400).json({
        message: "Not authorized to get data",
        code: 400,
        data: null,
        isError: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Issue on server side",
      code: 500,
      error,
      isError: true,
    });
  }
};

module.exports = getUsers;
