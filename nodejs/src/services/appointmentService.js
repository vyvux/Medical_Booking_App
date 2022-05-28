import e from "express";
import db, { sequelize } from "../models/index";

let createNewAppointment = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check if missing params
      if (!data.patientId || !data.doctorId || !data.date || !data.time || !data.reason) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      }

      let { patientId, doctorId, reason, date, time, status } = data;

      // validate params doctor and patient
      let findDoctor = await db.Doctor.findOne({
        where: { id: doctorId },
      });

      let findPatient = await db.Patient.findOne({
        where: { id: patientId },
      });

      if (!findDoctor || !findPatient) {
        resolve({
          errCode: 2,
          errMessage: "Doctor or Patient not found",
        });
      }

      // validate schedule
      let schedule = await db.Availability.findOne({
        where: { doctorId: doctorId, date: date, time: time },
        attributes: ["currentNumber", "maxNumber"],
        raw: true,
      });

      // if there is still available slot for the time
      // => add appointment
      if (schedule) {
        let { currentNumber, maxNumber } = schedule;
        if (currentNumber === maxNumber) {
          resolve({
            errCode: 4,
            message: "Doctor schedule is fully registered",
          });
        }

        // create appointment
        let appointment = await db.Appointment.create({
          patientId: patientId,
          doctorId: doctorId,
          reason: reason,
          date: date,
          time: time,
          status: status, //processing
        });
        console.log(schedule);

        resolve({
          errCode: 0,
          message: "Created appointment successfully!",
          appointment: appointment,
        });

        // increase current patient number of the schedule to be < 8
        schedule.currentNumber++;
        await schedule.save();
      } else {
        // not recorded schedule error
        resolve({
          errCode: 3,
          message: "Doctor schedule not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAppointments = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (e) {
      reject(e);
    }
  });
};

let deleteAppointment = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { createNewAppointment, getAppointments, deleteAppointment };
