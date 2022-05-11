import db, { sequelize } from "../models/index";
require("dotenv").config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let bulkCreateDoctorSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      }

      let schedule = data.arrSchedule;
      if (schedule && schedule.length > 0) {
        schedule.map((item) => {
          item.maxNumber = MAX_NUMBER_SCHEDULE;
          item.currentNumber = 0;
          return item;
        });

        // retrieve existing doctor schedule for that day in DB
        let existing = await db.Availability.findAll({
          where: { doctorId: data.doctorId, date: data.date },
          attributes: ["id", "doctorId", "date", "time", "maxNumber"],
          raw: true,
        });

        // format date before comparing
        if (existing && existing.length > 0) {
          existing = existing.map((item) => {
            item.date = new Date(item.date).getTime();
            return item;
          });
        }

        // find only new schedule
        let toCreate = schedule.filter((hour1) => existing.filter((hour2) => hour2.time === hour1.time).length === 0);

        // find only new schedule
        let toDelete = existing.filter((hour1) => schedule.filter((hour2) => hour2.time === hour1.time).length === 0);
        let deleteIds = [];
        toDelete.map((item) => deleteIds.push(item.id));

        // add only new schedule to DB
        if (toCreate && toCreate.length > 0) {
          await db.Availability.bulkCreate(toCreate);
        }

        if (toDelete && toDelete.length > 0) {
          await db.Availability.destroy({
            where: { id: deleteIds },
          });
        }

        resolve({
          errCode: 0,
          message: "Create doctor schedules successfully",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDoctorSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.date || !data.doctorId) {
        //!data.doctorId ||
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      }

      // retrieve existing doctor schedule for that day in DB
      let existingSchedules = await db.Availability.findAll({
        where: { doctorId: data.doctorId, date: data.date },
        attributes: ["id", "doctorId", "date", "time", "maxNumber"],
        raw: true,
      });

      resolve({
        errCode: 0,
        message: "OK",
        schedule: existingSchedules,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  bulkCreateDoctorSchedule: bulkCreateDoctorSchedule,
  getDoctorSchedule: getDoctorSchedule,
};
