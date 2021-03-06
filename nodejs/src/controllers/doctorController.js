import doctorService from "../services/doctorService";

let bulkCreateSchedule = async (req, res) => {
  try {
    let response = await doctorService.bulkCreateDoctorSchedule(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getDoctorSchedule = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing parameters",
      });
    }
    let response = await doctorService.getDoctorSchedule(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

module.exports = {
  bulkCreateSchedule: bulkCreateSchedule,
  getDoctorSchedule: getDoctorSchedule,
};
