function isString(string) {
  if (typeof string === "string") return true;
  throw new Error("String validation failed");
}

function isValidPassword(string, length) {
  const validate = /[A-Za-z0-9!#¤%&/()=)]{8,}/.test(string);
  if (!validate) throw new Error("Password Validation Failed");
}

module.exports = {
  isString,
  isValidPassword,
};
