const { default: mongoose } = require("mongoose");
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

// get Latest Cricket Match data from database
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

// UPDATE CRICKET SCORE
exports.updateCricketScore = async (req, res) => {
  try {
    const matchId = req.params.id;

    /*  
        matchId: "64974c9623b560afdd41ff6e",
        strikeBatsman: '64974c9623b560afdd41ff6f',
        nonStrikeBatsman: '64974c9623b560afdd41ff6f',
        strikeBowler: '64974c9623b560afdd41ff74',
        ball: '1',
        run: '0',
        extraRunType: '',
        outType: '' 
    */

    const {
      strikeBatsman,
      nonStrikeBatsman,
      strikeBowler,
      ball,
      run,
      extraRunType,
      outType,
    } = req.body;

    // Find the match by ID
    const match = await cricketMatchModel.findById(matchId);

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    // Update batsman data
    const batsmanToUpdate =
      match.team1.players.find(
        (player) => player._id.toString() === strikeBatsman
      ) ||
      match.team2.players.find(
        (player) => player._id.toString() === strikeBatsman
      );
    if (batsmanToUpdate) {
      batsmanToUpdate.ballsFaced += Number(ball);
      batsmanToUpdate.runsScored += Number(run);
      batsmanToUpdate.dismissals = outType;
    }

    const nonStrikeBatsmanToUpdate = match.team1.players.find(
      (player) => player._id.toString() === nonStrikeBatsman
    );
    if (nonStrikeBatsmanToUpdate) {
      // nonStrikeBatsmanToUpdate.ballsFaced = ball;
      // nonStrikeBatsmanToUpdate.runsScored = run;
      // nonStrikeBatsmanToUpdate.dismissals = outType;
    }

    // Update bowler data
    const bowlerToUpdate =
      match.team1.players.find(
        (player) => player._id.toString() === strikeBowler
      ) ||
      match.team2.players.find(
        (player) => player._id.toString() === strikeBowler
      );
    if (bowlerToUpdate) {
      bowlerToUpdate.runsConceded = run;
    }

    // Save the updated match data
    await match.save();

    res.status(200).json({
      status: "success",
      message: "Match data updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};
