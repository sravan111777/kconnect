const meetingModel = require("../../models/meeting.model");

const deleteMeeting = async (req, res) => {
  try {
    const meetingId = req.params.id;

    if (req.user.role !== "college_admin") {
      res.status(400).json({
        message: "Not authorized to get meetings",
        code: 400,
        data: null,
        isError: true,
      });
    } else {
      await meetingModel.findByIdAndDelete(meetingId).exec();

      res.status(200).json({
        message: "Deleted the meeting",
        code: 200,
        data: null,
        isError: false,
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

module.exports = deleteMeeting;
