const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const loginRouter = require("./auth/login");
const registerRouter = require("./auth/register");
const boardRouter = require("./board");

router.use("/", loginRouter);
router.use("/", registerRouter);
router.use("/idea/", authenticate, boardRouter);



module.exports = router;
