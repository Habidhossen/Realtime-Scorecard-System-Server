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

    // Update Team Data
    const isBattingTeam = match.team1.players.some(
      (player) => player._id.toString() === strikeBatsman
    );
    // Check condition which is Batting Team then update score (Run, Over, Wicket)
    if (isBattingTeam) {
      match.team1.runs += Number(run);
      match.team1.wickets += Number(outType === "Not Out" ? 0 : 1);
      match.team1.overs = `${Math.floor(totalBalls / 6)}.${totalBalls % 6}`;
    } else {
      match.team2.runs += Number(run);
      match.team2.wickets += Number(outType === "Not Out" ? 0 : 1);
      match.team2.overs = `${Math.floor(totalBalls / 6)}.${totalBalls % 6}`;
    }

    // Update Batsman data
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
      batsmanToUpdate.fours += Number(run) === 4 ? 1 : 0;
      batsmanToUpdate.sixes += Number(run) === 6 ? 1 : 0;
      batsmanToUpdate.strikeRate = Number(
        (batsmanToUpdate?.runsScored / batsmanToUpdate?.ballsFaced) * 100
      ).toFixed(2);
      batsmanToUpdate.dismissals = outType;
    }

    // Update Bowler data
    const bowlerToUpdate =
      match.team1.players.find(
        (player) => player._id.toString() === strikeBowler
      ) ||
      match.team2.players.find(
        (player) => player._id.toString() === strikeBowler
      );
    if (bowlerToUpdate) {
      bowlerToUpdate.runsConceded += Number(run);
      bowlerToUpdate.wicketsTaken += Number(outType === "Not Out" ? 0 : 1);
      bowlerToUpdate.wideBalls += Number(extraRunType === "Wide" ? 1 : 0);
      bowlerToUpdate.noBalls += Number(outType === "No Ball" ? 1 : 0);
    }

    /* const nonStrikeBatsmanToUpdate = match.team1.players.find(
      (player) => player._id.toString() === nonStrikeBatsman
    );
    if (nonStrikeBatsmanToUpdate) {
    } */

    // Save the updated match data
    await match.save();
    // Send response
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
