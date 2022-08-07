const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET } = require("../../lib/config");
const { UserModel } = require("../../models");
const { isValidPassword } = require("../../lib/validators");

const validateBody = (body) => {
  isValidPassword(body.password);
};

router.post("/login", async (request, response, next) => {
  try {
    validateBody(request.body);
    const { username, password } = request.body;
    const user = await UserModel.find({ username }).lean();

    if (!user) return response.status(401).json({ error: "user doesn't exists" });

    const passwordCorrect = await bcrypt.compare(
      password,
      user[0]?.passwordHash
    );

    if (!passwordCorrect) return response.status(401).json({ error: "invalid username or password" });

    const userToken = {
      username: user[0].username,
      id: user[0]._id.toString(),
    };

    const token = jwt.sign(userToken, SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
