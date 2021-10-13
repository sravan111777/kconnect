const userModel = require("../../models/user.model");

const verify = async (req, res) => {
  try {
    const userId = req.params.id.trim();

    if (userId === undefined || userId === "") {
      res.send("Wrong user!");
    } else {
      await userModel
        .findByIdAndUpdate(userId, {
          isVerified: true,
        })
        .exec();
      res.send(`Successfully verified the user!`);
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = verify;
