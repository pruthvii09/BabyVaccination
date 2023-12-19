const Vaccine = require("../models/vaccineSchema");
const generateSchedule = async (babyId, birthDateStr) => {
  const birthDate = new Date(birthDateStr);
  const schedule = [
    { name: "DTwP /DTaP1, Hib-1, IPV-1, Hep B2, PCV 1, Rota-1", weeksLater: 6 },
    {
      name: "DTwP /DTaP2, Hib-2, IPV-2, Hep B3, PCV 2, Rota-2",
      weeksLater: 10,
    },
    {
      name: "DTwP /DTaP3, Hib-3, IPV-3, Hep B4, PCV 3, Rota-3*",
      weeksLater: 14,
    },
    { name: "Influenza-1", monthsLater: 6 },
    { name: "Influenza -2", monthsLater: 7 },
    { name: "Typhoid Conjugate Vaccine", monthsLater: 9 },
    { name: "MMR 1 (Mumps, measles, Rubella)", monthsLater: 9 },
    { name: "Hepatitis A- 1", monthsLater: 12 },
    { name: "PCV Booster", monthsLater: 12 },
    { name: "MMR 2, Varicella", monthsLater: 15 },
  ];

  const vaccineSchedule = schedule.map(({ name, weeksLater, monthsLater }) => {
    const date = new Date(birthDate);
    if (weeksLater) {
      date.setDate(birthDate.getDate() + weeksLater * 7);
    } else if (monthsLater) {
      date.setMonth(birthDate.getMonth() + monthsLater);
    }
    return {
      name,
      date: date.toISOString(),
      givenDate: "Not Given", // Initially not given
      status: false, // Initially not administered
    };
  });
  const vaccine = await Vaccine.create({
    babyId: babyId,
    vaccine: vaccineSchedule,
  });
  if (!vaccine) {
    return res.status(400).json({ error: "Could Not Add Baby" });
  }
};
const getSignleVaccine = async (req, res) => {
  const { babyId } = req.params;
  try {
    const vaccine = await Vaccine.find({ babyId: babyId });
    if (!vaccine) {
      return res.status(400).json({ error: "No Vaccine Plan" });
    }
    return res.status(200).json({ ...vaccine });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const updateVaccineStatus = async (req, res) => {
  const { vaccineId } = req.params;

  try {
    // Find the vaccine document by vaccineId
    const vaccine = await Vaccine.findOneAndUpdate(
      {
        "vaccine._id": vaccineId,
      },
      {
        $set: {
          "vaccine.$.status": !req.body.status, // Toggle the status
          "vaccine.$.givenDate": new Date().toISOString(),
        },
      },
      { new: true } // Return the updated document
    );

    if (!vaccine) {
      return res.status(404).json({ error: "Vaccine not found" });
    }

    return res.status(200).json({ success: true, vaccine });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { generateSchedule, getSignleVaccine, updateVaccineStatus };
