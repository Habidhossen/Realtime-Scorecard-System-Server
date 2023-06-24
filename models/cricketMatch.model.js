const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: String,
  type: String,
  runsScored: Number,
  ballsFaced: Number,
  fours: Number,
  sixes: Number,
  dismissals: String,
  wicketsTaken: Number,
  oversBowled: Number,
  runsConceded: Number,
  economyRate: Number,
  strikeRate: Number,
});

const cricketMatchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tossChoice: {
      type: String,
      required: true,
    },
    tossWinner: {
      type: String,
      required: true,
    },
    totalOver: {
      type: Number,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    team1: {
      name: {
        type: String,
        required: true,
      },
      captain: {
        name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
      },
      players: [playerSchema],
      overs: Number,
      wickets: Number,
      runs: Number,
    },
    team2: {
      name: {
        type: String,
        required: true,
      },
      captain: {
        name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
      },
      players: [playerSchema],
      overs: Number,
      wickets: Number,
      runs: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CricketMatch", cricketMatchSchema);
