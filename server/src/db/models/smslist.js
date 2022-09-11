const mongoose = require("mongoose");

const smslistSchema = new mongoose.Schema(
  {
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
    },
    otp: {
      type: Number,
      trim: true,
    },
    sid:{
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

// Create Contacts collection
const Smslist = mongoose.model("Smslist", smslistSchema);

module.exports = Smslist;
