const Mongoose = require("mongoose");

const boardSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: [
        true,
        "Please enter a valid username with minimum 5 characters",
      ],
      min: 3,
    },
    user: { type: Mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Board", boardSchema);
