const { verifyToken } = require("../helper/jwtToken");
const Hospital = require("../models/hospitalSchema");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ error: "Auth Token Required" });
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(400).json({ error: "Auth Token Required" });
  }
  let decoded;
  try {
    decoded = await verifyToken(token);
  } catch (error) {
    return res.status(400).json({ error: "Auth Failed Try Again Later" });
  }
  try {
    const hospital = await Hospital.findById(decoded._id);
    if (hospital) {
      req.hospital = hospital;
    } else {
      return res.status(400).json({ error: "Auth Failed" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: "Auth Failed" });
  }
};
