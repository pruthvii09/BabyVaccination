const express = require("express");
const {
  addBaby,
  getBaby,
  getSingleBaby,
} = require("../controller/babyController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, addBaby);
router.get("/", getBaby);
router.get("/:_id", auth, getSingleBaby);

module.exports = router;
