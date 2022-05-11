const userModel = require("../../models/user.model");
const { remove } = require("../../S3");

const deleteUser = async (req, res) => {
  try {
    const requiredUser = await userModel.findByIdAndDelete(req.user._id).exec();

    //delete profile photo
    if (requiredUser.profilePhoto) {
      const tempArray = requiredUser.profilePhoto.split("/");
      const s3Data = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${tempArray[3]}/${tempArray[4]}`,
      };
      await remove(s3Data);
    }

    res.status(200).json({
      message: "Successfully deleted the user",
      code: 200,
      data: null,
      isError: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Issue on server side",
      code: 500,
      error,
      isError: true,
    });
  }
};

module.exports = deleteUser;
