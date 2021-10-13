const meetingModel = require("../../models/meeting.model");

const getMeeting = async (req, res) => {
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
      const meeting = await meetingModel.findById(meetingId);

      if (meeting) {
        res.status(200).json({
          message: "Successfully fetched the meeting",
          code: 200,
          data: {
            title: meeting.title,
            link: meeting.link,
            scheduledAt: meeting.scheduledAt,
          },
          isError: false,
        });
      } else {
        res.status(400).json({
          message: "Not authorized to get meeting",
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

module.exports = getMeeting;
