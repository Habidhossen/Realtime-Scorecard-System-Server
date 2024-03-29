const { default: mongoose } = require("mongoose");
const cricketMatchModel = require("../models/cricketMatch.model");

// create a new Match in database
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

// get all Match data from database
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

// delete Match from database by ID
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
    const teamToUpdate = match.team1.players.some(
      (player) => player._id.toString() === strikeBatsman
    )
      ? match.team1
      : match.team2;

    teamToUpdate.runs +=
      extraRunType === "Wide" || extraRunType === "No Ball"
        ? 1 + Number(run)
        : Number(run);
    teamToUpdate.balls +=
      extraRunType === "Wide" || extraRunType === "No Ball" ? 0 : Number(ball);
    teamToUpdate.wickets += outType !== "Not Out" ? 1 : 0;
    teamToUpdate.overs = `${Math.floor(teamToUpdate.balls / 6)}.${
      teamToUpdate.balls % 6
    }`;

    // Update Batsman data
    const batsmanToUpdate =
      match.team1.players.find(
        (player) => player._id.toString() === strikeBatsman
      ) ||
      match.team2.players.find(
        (player) => player._id.toString() === strikeBatsman
      );

    if (batsmanToUpdate) {
      batsmanToUpdate.ballsFaced += Number(
        extraRunType === "Wide" || extraRunType === "No Ball" ? 0 : ball
      );
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
      bowlerToUpdate.ballsBowled += Number(
        extraRunType === "Wide" || extraRunType === "No Ball" ? 0 : ball
      );
      bowlerToUpdate.wicketsTaken += Number(outType === "Not Out" ? 0 : 1);
      bowlerToUpdate.wideBalls += Number(extraRunType === "Wide" ? 1 : 0);
      bowlerToUpdate.noBalls += Number(outType === "No Ball" ? 1 : 0);
      bowlerToUpdate.economyRate = Number(
        bowlerToUpdate?.runsConceded / (bowlerToUpdate?.ballsBowled / 6)
      ).toFixed(2);
    }

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

// FINISH CRICKET MATCH & UPDATE STATUS
exports.matchFinish = async (req, res) => {
  try {
    const matchId = req.params.id;
    const { status, matchWinner } = req.body;

    // Find the match by ID
    const match = await cricketMatchModel.findById(matchId);

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    // update data
    match.status = status;
    match.matchWinner = matchWinner;

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
