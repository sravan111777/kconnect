const collegeModel = require("../../models/college.model");

const subscribeToPlan = async (req, res) => {
  try {
    const { isSuperAdmin } = req.user;
    if (isSuperAdmin) {
      const collegeId = req.params.collegeId;
      const plan = req.params.plan;

      const college = await collegeModel.findById(collegeId).exec();

      if (college.isApproved) {
        // subscribe
        await collegeModel.findByIdAndUpdate(collegeId, { plan }).exec();

        res.status(200).json({
          message: `Successfully subscribed ${college.collegeName} to ${plan} plan.`,
          data: null,
          isError: true,
        });
      } else {
        // dont :/
        res.status(200).json({
          message: "College is not approved by Admins.",
          data: null,
          isError: true,
        });
      }
    } else {
      res.status(200).json({
        message: "Unauthorized to subscribe a college.",
        data: null,
        isError: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

const getPlan = async (req, res) => {
  try {
    const { role } = req.user;
    if (role === "college_admin" || role === "super_admin") {
      // get plan
      const collegeId = req.user._id;
      const plan = await collegeModel.findById(collegeId, "plan").exec();

      res.status(200).json({
        message: "Successfully grabbed your plan.",
        data: plan,
        isError: false,
      });
    } else {
      // NO
      res.status(200).json({
        message: "Unauthorized to get the plan.",
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

module.exports = { subscribeToPlan, getPlan };
