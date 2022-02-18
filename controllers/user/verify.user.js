const userModel = require("../../models/user.model");

const verify = async (req, res) => {
  try {
    const userId = req.params.id.trim();

    if (userId === undefined || userId === "") {
      res
        .status(400)
        .json({ message: "Wrong user", data: null, isError: true });
    } else {
      await userModel
        .findByIdAndUpdate(userId, {
          isVerified: true,
        })
        .exec();
      res.redirect(`${process.env.FRONT_END_URL}/login`);
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = verify;
