const eventModel = require("../models/event.model");

// create a new Event in database
exports.createEvent = async (req, res) => {
  try {
    const data = req.body;
    const eventData = new eventModel(data);
    await eventData.save();
    res.status(201).json({
      status: "success",
      message: "Data inserted successfully",
      data: eventData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Data not inserted",
      error: error.message,
    });
  }
};

// get all Event data from database
exports.getAllEvent = async (req, res) => {
  try {
    const eventData = await eventModel.find();
    res.status(200).json({
      status: "success",
      data: eventData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};

// get single Event data from database by ID
exports.getSingleEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const eventData = await eventModel.findById(eventId);
    res.status(200).json({
      status: "success",
      data: eventData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};

// delete Event from database by ID
exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    await eventModel.findByIdAndDelete(eventId);
    res.status(200).json({
      status: "success",
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};
