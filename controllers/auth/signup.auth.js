const userModel = require("../../models/user.model");
const checkUserExists = require("../../utils/checkUserExists");
const bcrypt = require("bcrypt");
const sendVerifEmail = require("../../utils/sendVerifEmail");
var checkNumberExists = require("../../utils/checkNumberExists");
const { startSession } = require("mongoose");
const { upload } = require("../../S3");
const { fileType } = require("../../utils/util");
const uuid = require("uuid").v4;

const signup = async (req, res) => {
  const session = await startSession();

  try {
    const { fullName, email, password, role, number } = req.body;
    if (!fullName || !email || !password || !role || !number) {
      // no data, send error
      res.status(200).json({
        message: "Please provide the data to signup.",
        data: null,
        isError: true,
      });
    } else {
      // check if user exists
      if (await checkUserExists(email)) {
        return res.status(200).json({
          message: "Account already exists.",
          data: null,
          isError: true,
        });
      } else if (!!(await checkNumberExists(number))) {
        return res.status(400).json({
          message: "Account with this number already exists.",
          data: null,
          isError: true,
        });
      } else {
        const hashPass = await bcrypt.hash(password, 10);

        let isSuperAdmin = false;

        if (role === "super_admin") {
          isSuperAdmin = true;
        } else {
          isSuperAdmin = false;
        }
        //starting transaction
        session.startTransaction();

        const newUser = new userModel({
          fullName,
          email,
          password: hashPass,
          role,
          phoneNumber: number,
          isSuperAdmin,
        });

        await newUser.save({ session });

        //upload profile profilePhoto
        let profilePhoto = null;
        if (req.file) {
          const filesNameSplit = req.file.originalname.split(".");
          const fileName = filesNameSplit[0];
          const extension = filesNameSplit[filesNameSplit.length - 1];

          if ((await fileType(extension)) !== "Image") {
            return res.status(400).json({
              message: "Please provide an image file for profile.",
              data: null,
              isError: true,
            });
          }

          const s3Data = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `profilePhoto/${fileName}_${uuid()}.${extension}`,
            Body: req.file.buffer,
          };

          const response = await upload(s3Data);
          profilePhoto = response?.Location;

          newUser.profilePhoto = profilePhoto;
          await newUser.save({ session });
        }

        // let link = `http://localhost:8000/api/verify/${newUser._id}`;
        let link = `https://api.kconnect.in/api/verify/${newUser._id}`;

        const response = await sendVerifEmail(email, fullName, link);
        if (response) {
          await session.commitTransaction();
          //end transaction
          session.endSession();
          res.status(200).json({
            message: "Successfully created your account.",
            data: {
              email: newUser.email,
            },
            isError: false,
          });
        } else {
          await session.abortTransaction();
          session.endSession();
          return res.status(200).json({
            message: "Failed to send verfication email.",
            data: null,
            isError: true,
          });
        }
      }
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(200).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

module.exports = signup;
