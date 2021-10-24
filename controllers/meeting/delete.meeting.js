const meetingModel = require("../../models/meeting.model");

const deleteMeeting = async (req, res) => {
  try {
    const meetingId = req.params.id;

    if (req.user.role !== "college_admin") {
      res.status(200).json({
        message: "Not authorized to get meetings.",
        data: null,
        isError: true,
      });
    } else {
      await meetingModel.findByIdAndDelete(meetingId).exec();

      res.status(200).json({
        message: "Deleted the meeting.",
        data: null,
        isError: false,
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

module.exports = deleteMeeting;
