const express = require("express");
const {
  getSignleVaccine,
  updateVaccineStatus,
} = require("../controller/vaccineController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:babyId", auth, getSignleVaccine);
router.patch("/:vaccineId", auth, updateVaccineStatus);

module.exports = router;
