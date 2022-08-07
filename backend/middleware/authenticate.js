const jwt = require("jsonwebtoken");
const { SECRET } = require("../lib/config");

const authenticate = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, async (err, user) => {
      if (err) {
        return response.sendStatus(403);
      }

      request.user = user;
    });
  } else {
    response.sendStatus(401);
  }
};

module.exports = authenticate;
