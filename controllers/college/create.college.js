const collegeModel = require("../../models/college.model");
const userModel = require("../../models/user.model");

const createCollege = async (req, res) => {
  try {
    const collegeAdmin = req.user._id;

    const clg = await collegeModel.findOne({ collegeAdmin }).exec();
    if (clg) {
      // update clg
      const clgId = clg._id;

      await collegeModel
        .findByIdAndUpdate(clgId, { ...req.body, collegeAdmin })
        .exec();

      res.status(200).json({
        message: "Successfully updated the college.",
        data: null,
        isError: false,
      });
    } else {
      // create college
      const { collegeName, collegeEmail, collegeInfo } = req.body;

      if (!collegeEmail || !collegeName || !collegeInfo) {
        res.status(200).json({
          message: "Please provide the data to create college.",
          data: null,
          isError: true,
        });
      } else {
        const { role } = req.user;
        if (role === "college_admin") {
          const college = new collegeModel({
            collegeName,
            collegeEmail,
            collegeInfo,
            collegeAdmin: req.user._id,
          });

          await userModel
            .findByIdAndUpdate(req.user._id, {
              collegeId: college._id,
            })
            .exec();

          await college.save();

          res.status(200).json({
            message: "Successfully created the college.",
            data: {
              collegeName,
              collegeEmail,
            },
            isError: false,
          });
        } else {
          res.status(200).json({
            message: "Not authorized to create college.",
            data: null,
            isError: true,
          });
        }
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

module.exports = createCollege;
