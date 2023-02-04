const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

// Blog Schema
const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Event Schema
const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    sport: {
      type: String,
      enum: ["Cricket", "Football"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
  },
  { timestamps: true }
);

// Team Schema
const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sport: {
      type: String,
      enum: ["Cricket", "Football"],
      required: true,
    },
    captain: {
      type: Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
  },
  { timestamps: true }
);

// Player Schema
const PlayerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sport: {
      type: String,
      enum: ["Cricket", "Football"],
      required: true,
    },
    role: {
      type: String,
      enum: [
        "Batsman",
        "Bowler",
        "Fielder",
        "Wicket-keeper",
        "All-rounder",
        "Forward",
        "Midfielder",
        "Defender",
        "Goal-keeper",
      ],
      required: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
  },
  { timestamps: true }
);

// Match Schema
const MatchSchema = new Schema(
  {
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
        required: true,
      },
    ],
    sport: {
      type: String,
      enum: ["Cricket", "Football"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    score: [{ type: Number }],
  },
  { timestamps: true }
);

// Review/Feedback Schema
const ReviewSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

// Create Model
const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", BlogSchema);
const Event = mongoose.model("Event", EventSchema);
const Team = mongoose.model("Team", TeamSchema);
const Player = mongoose.model("Player", PlayerSchema);
const Match = mongoose.model("Match", MatchSchema);
const Review = mongoose.model("Review", ReviewSchema);

// Exports
module.exports = {
  User,
  Blog,
  Event,
  Team,
  Player,
  Match,
  Review,
};
