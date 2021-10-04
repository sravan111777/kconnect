const getUser = async (req, res) => {
  try {
    const { _id, fullName, email, isSuperAdmin, role } = req.user;

    res.status(200).json({
      id: _id,
      fullName,
      email,
      isSuperAdmin,
      role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Issue on server side",
      code: 500,
      error,
      isError: true,
    });
  }
};

module.exports = getUser;
