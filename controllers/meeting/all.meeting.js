const meetingModel = require("../../models/meeting.model");

const getAllMeetings = async (req, res) => {
  try {
    if (req.user.role !== "college_admin") {
      res.status(400).json({
        message: "Not authorized to get meetings",
        code: 400,
        data: null,
        isError: true,
      });
    } else {
      const collegeAdmin = req.user._id;

      const meetings = await meetingModel.find({ issuedBy: collegeAdmin });

      if (meetings.length !== 0) {
        res.status(200).json({
          message: "Successfully fetched the meetings",
          code: 200,
          data: meetings,
          isError: false,
        });
      } else {
        res.status(400).json({
          message: "Not authorized to get meetings",
          code: 400,
          data: null,
          isError: true,
        });
      }
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
