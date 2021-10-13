const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authCheck = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(400).json({
        message: "Failed to authorize",
        code: 400,
        data: null,
        isAuthError: true,
      });
    } else {
      const decoded = jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.SECRET
      );
      const id = decoded.id;

      const user = await userModel
        .findById(id, "fullName email isSuperAdmin role isVerified")
        .exec();

      if (user == null || !user.isVerified) {
        return res.status(400).json({
          message: "Failed to authorize",
          code: 400,
          data: null,
          isAuthError: true,
        });
      }
      req.user = user;
      next();
    }
  } catch (error) {
    if (error.name == "JsonWebTokenError") {
      res.status(400).json({
        message: "Authorization token is incorrect",
        code: 400,
        data: null,
        isTokenError: true,
      });
    } else {
      res.status(500).json({
        message: "Issue on server side",
        code: 500,
        error,
        isError: true,
      });
    }
  }
};

module.exports = authCheck;
