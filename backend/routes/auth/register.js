const router = require("express").Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../../models");
const { isValidPassword } = require("../../lib/validators");

const validateBody = (body) => {
  isValidPassword(body.password);
};

router.post("/register", async (request, response, next) => {
  try {
    validateBody(request.body);
    const { username, email, password } = request.body;

    let usernameExists = await UserModel.findOne({ email });
    if (usernameExists)
      return response.status(400).send("Username already registered.");

    let emailExists = await UserModel.findOne({ email });
    if (emailExists)
      return response.status(400).send("Email already registered.");

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await UserModel.create({ username, email, passwordHash });

    response.json({
      username: user.username,
      id: user._id,
      created: user.created,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
