const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vaccineSchema = new Schema(
  {
    babyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "babies",
    },
    vaccine: [
      {
        name: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
        givenDate: {
          type: String,
          default: "Not Given",
          required: true,
        },
        status: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vaccine", vaccineSchema);
