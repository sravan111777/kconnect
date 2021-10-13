const meetingModel = require("../../models/meeting.model");

const createMeeting = async (req, res) => {
  try {
    if (req.user.role !== "college_admin") {
      res.status(400).json({
        message: "Not authorized to create meeting",
        code: 400,
        data: null,
        isError: true,
      });
    } else {
      const collegeAdmin = req.user._id;

      const title = req.body.title.trim();
      const link = req.body.link.trim();

      if (!title || !link) {
        res.status(400).json({
          message: "Please provide the data",
          code: 400,
          data: null,
          isDataError: true,
        });
      } else {
        const newMeeting = new meetingModel({
          title,
          link,
          issuedBy: collegeAdmin,
        });

        await newMeeting.save();

        res.status(200).json({
          message: "Successfully created the meeting",
          code: 200,
          data: {
            title,
            link,
          },
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

module.exports = createMeeting;
