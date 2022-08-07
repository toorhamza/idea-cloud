const router = require("express").Router();
const loginRouter = require("./auth/login");
const registerRouter = require("./auth/register");

router.use("/", loginRouter);
router.use("/", registerRouter);


module.exports = router;
