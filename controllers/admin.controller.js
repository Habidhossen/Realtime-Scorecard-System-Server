const adminModel = require("../models/admin.model");

// create Admin
exports.createAdmin = async (req, res) => {
  try {
    const existAdmin = await adminModel.findOne({ email: req.body.email });
    if (existAdmin) {
      res.status(400).json({
        status: "fail",
        message: "Admin already exists",
      });
    } else {
      const adminData = req.body;
      const admin = new adminModel(adminData);
      await admin.save();
      res.status(201).json({
        status: "success",
        message: "Data inserted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Data not inserted",
      error: error.message,
    });
  }
};

// get all Admin
exports.getAllAdmin = async (req, res) => {
  try {
    const admins = await adminModel.find();
    res.status(200).json({
      status: "success",
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};
