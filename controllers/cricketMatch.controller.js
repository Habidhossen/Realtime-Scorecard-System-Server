const cricketMatchModel = require("../models/cricketMatch.model");

// create a new Event in database
exports.createCricketMatch = async (req, res) => {
  try {
    const data = req.body;
    const cricketMatchData = new cricketMatchModel(data);
    await cricketMatchData.save();
    res.status(201).json({
      status: "success",
      message: "Data inserted successfully",
      data: cricketMatchData,
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
exports.getAllCricketMatch = async (req, res) => {
  try {
    const cricketMatchData = await cricketMatchModel
      .find()
      .sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      data: cricketMatchData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};

/* // get single Event data from database by ID
exports.getSingleCricketMatch = async (req, res) => {
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
}; */

// get single Event data from database by ID
exports.getLatestCricketMatch = async (req, res) => {
  try {
    const cricketMatchData = await cricketMatchModel
      .find()
      .sort({ createdAt: -1 })
      .limit(1);
    res.status(200).json({
      status: "success",
      data: cricketMatchData,
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
exports.deleteCricketMatch = async (req, res) => {
  try {
    const matchId = req.params.id;
    await cricketMatchModel.findByIdAndDelete(matchId);
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
