const { createToken } = require("../helper/jwtToken");
const Hospital = require("../models/hospitalSchema");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { regNo, name, address, contact, email, password } = req.body;

  // Basic validation checks
  if (!regNo || !name || !address || !contact || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // You can add more specific validation checks based on your requirements

  try {
    const exist = await Hospital.findOne({ regNo });

    if (exist) {
      return res
        .status(400)
        .json({ error: "Already Registered, Please Login" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const hospital = await Hospital.create({
      regNo,
      name,
      address,
      contact,
      email,
      password: hash,
    });

    const token = createToken(hospital._id);

    return res.status(200).json({ email, token, regNo });
  } catch (error) {
    res.status(400).json({ error: error.message || "An error occurred" });
  }
};

const login = async (req, res) => {
  const { regNo, password } = req.body;
  try {
    const hospital = await Hospital.findOne({ regNo });
    if (!hospital) {
      return res.status(400).json({ error: "No Such Hospital Found!" });
    }
    const match = await bcrypt.compare(password, hospital.password);
    if (!match) {
      return res.status(400).json({ error: "Password Does Not Match!" });
    }
    const token = createToken(hospital._id);
    return res.status(200).json({ email: hospital.email, regNo, token });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = { signup, login };
