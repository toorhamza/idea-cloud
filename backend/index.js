const express = require("express");
const app = express();

const { PORT } = require("./lib/config");
const { connectToDb } = require("./lib/db");
const errorHandler = require("./middleware/errorHandler");
const router = require("./routes/index");

app.use(express.json()); // to support JSON-encoded bodies
app.use(router);

app.get("/status", (req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

const start = async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
