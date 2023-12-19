const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  console.log(_id);
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return error;
  }
};
module.exports = { createToken, verifyToken };
