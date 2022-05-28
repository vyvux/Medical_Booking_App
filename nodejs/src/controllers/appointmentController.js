import appointmentService from "../services/appointmentService";

let createAppointment = async (req, res) => {
  let message = await appointmentService.createNewAppointment(req.body);
  return res.status(200).json(message);
};

let getAllAppointments = async (req, res) => {
  let id = req.query.id; //ALL ,or id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }

  let users = await appointmentService.getAppointments(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

let deleteAppointment = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await appointmentService.deleteAppointment(req.body.id);
  return res.status(200).json(message);
};

module.exports = { createAppointment, getAllAppointments, deleteAppointment };
