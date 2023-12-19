const Baby = require("../models/babySchema");
const { generateSchedule } = require("./vaccineController");
const addBaby = async (req, res) => {
  const {
    mother,
    father,
    name,
    dob,
    weight,
    gender,
    contact,
    email,
    hospitalId,
  } = req.body;

  try {
    // Basic validation checks
    if (
      !mother ||
      !father ||
      !name ||
      !dob ||
      !weight ||
      !gender ||
      !contact ||
      !email
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // You can add more specific validation checks based on your requirements
    // For example, check if email is a valid email address, if weight is a valid number, etc.

    const baby = await Baby.create({
      mother,
      father,
      name,
      dob,
      weight,
      gender,
      contact,
      email,
      hospitalId: req.hospital._id,
    });
    await generateSchedule(baby._id, baby.dob);
    if (!baby) {
      return res.status(400).json({ error: "Could not Add Baby" });
    }

    return res.status(200).json({ baby });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.contact) {
      // Duplicate key error, contact number is not unique
      return res.status(400).json({ error: "Contact number must be unique" });
    }
    return res
      .status(400)
      .json({ error: error.message || "An error occurred" });
  }
};

const getBaby = async (req, res) => {
  try {
    const babies = await Baby.find();
    if (!babies) {
      return res.status(400).json({ error: "No babies Found!" });
    }
    return res.status(200).json({ babies });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
const getSingleBaby = async (req, res) => {
  const { _id } = req.params;
  try {
    const baby = await Baby.findOne({ _id });
    if (!baby) {
      return res.status(400).json({ error: "No Such Baby Found!" });
    }
    return res.status(200).json({ baby });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
module.exports = { addBaby, getBaby, getSingleBaby };
