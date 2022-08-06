const Mongoose = require("mongoose");

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a valid username with minimum 5 characters"],
    min: 5,
  },
  email: {
    type: String,
    required: [true, "Please enter Email Address"],
    validate: [validateEmail, "Please fill a valid email address"],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  created: { type: Date, default: Date.now },
});



module.exports = Mongoose.model("User", userSchema);
