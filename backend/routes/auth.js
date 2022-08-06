const router = require("express").Router();

const { UserModel } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
