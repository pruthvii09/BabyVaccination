const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const babySchema = Schema(
  {
    mother: {
      type: String,
      required: true,
    },
    father: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hospitals", // Reference to the Hospital model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Baby", babySchema);

// {
//     "mother":"Savita Auti",
//     "father":"Dattatray Auti",
//     "name":"Pruthviraj Auti",
//     "dob":"09-11-2002",
//     "weight":"2kg",
//     "gender":"Male"
//     "contact":"9699902532",
//     "email":"autipruthviraj@gmail.com",
//     "hospitalId":""
// }
