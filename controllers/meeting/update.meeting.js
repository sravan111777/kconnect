const meetingModel = require("../../models/meeting.model");

const updateMeeting = async (req, res) => {
  try {
    const meetingId = req.params.id;

    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      res.status(400).json({
        message: "No data to update",
        code: 400,
        data: null,
        isUpdateError: true,
      });
    } else {
      if (req.user.role !== "college_admin") {
        res.status(400).json({
          message: "Not authorized to update meeting",
          code: 400,
          data: null,
          isError: true,
        });
      } else {
        await meetingModel.findByIdAndUpdate(meetingId, req.body).exec();

        res.status(201).json({
          message: "Successfully updated the meeting",
          code: 201,
          data: null,
          isError: false,
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

module.exports = updateMeeting;
