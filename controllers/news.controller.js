const newsModel = require("../models/news.model");

// create a new News in database
exports.createNews = async (req, res) => {
  try {
    const data = req.body;
    const newsData = new newsModel(data);
    await newsData.save();
    res.status(201).json({
      status: "success",
      message: "Data inserted successfully",
      data: newsData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Data not inserted",
      error: error.message,
    });
  }
};

// get all News data from database
exports.getAllNews = async (req, res) => {
  try {
    const newsData = await newsModel.find();
    res.status(200).json({
      status: "success",
      data: newsData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};

// get single News data from database by ID
exports.getSingleNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const newsData = await newsModel.findById(newsId);
    res.status(200).json({
      status: "success",
      data: newsData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};

// delete News from database by ID
exports.deleteNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    await newsModel.findByIdAndDelete(newsId);
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
