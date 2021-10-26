const collegeModel = require("../../models/college.model");
const meetingModel = require("../../models/meeting.model");
const userModel = require("../../models/user.model");

const getAllMeetings = async (req, res) => {
  try {
    if (req.user.role === "student") {
      const studentId = req.user._id;

      const college = await userModel.findById(studentId, "collegeId").exec();

      const clgAdmin = await collegeModel
        .findById(college.collegeId, "collegeAdmin")
        .exec();

      const meetings = await meetingModel.find({
        issuedBy: clgAdmin.collegeAdmin,
      });

      if (meetings.length !== 0) {
        res.status(200).json({
          message: "Successfully fetched the meetings.",
          data: meetings,
          isError: false,
        });
      } else {
        res.status(200).json({
          message: "Failed to get meetings.",
          data: null,
          isError: true,
        });
      }
    } else if (req.user.role === "college_admin") {
      const collegeAdmin = req.user._id;

      const meetings = await meetingModel.find({ issuedBy: collegeAdmin });

      if (meetings.length !== 0) {
        res.status(200).json({
          message: "Successfully fetched the meetings.",
          data: meetings,
          isError: false,
        });
      } else {
        res.status(200).json({
          message: "Failed to get meetings.",
          data: null,
          isError: true,
        });
      }
    } else {
      res.status(200).json({
        message: "Not authorized to get meetings.",
        data: null,
        isError: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Issue on server side",
      code: 500,
      error,
      isError: true,
    });
  }
};

module.exports = getAllMeetings;
