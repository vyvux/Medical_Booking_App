const renderGender = (gender) => {
  switch (gender) {
    case 1:
      return "Male";
    default:
      return "Female";
  }
};

const renderService = (serviceList, serviceId) => {
  let service = serviceList.find(({ id }) => id === serviceId);
  if (service) {
    return service.name;
  } else {
    return "Unknown service";
  }
};

const renderBranch = (branchList, branchId) => {
  let branch = branchList.find(({ id }) => id === branchId);
  if (branch) {
    return branch.name;
  } else {
    return "Unkwown branch";
  }
};

const renderClinicInfo = (clinicInfo, infoId) => {
  let item = clinicInfo.find(({ id }) => id === infoId);
  if (item) {
    return item.name;
  } else {
    return "Unknown clinic information";
  }
};

// render role - all code
const renderAllCode = (allCode, keyCode) => {
  if (keyCode && typeof keyCode !== "string") {
    keyCode = keyCode.toString();
  }

  let item = allCode.find(({ key }) => key === keyCode);
  if (item) {
    return item.value;
  } else {
    return "Unknown key code";
  }
};

const renderPatient = (patientList, patientId) => {
  let patient = patientList.find(({ id }) => id === patientId);
  if (patient) {
    return `ID ${patient.id} - ${patient.firstName} ${patient.lastName}`;
  } else {
    return "Unknown patient";
  }
};
const renderDoctor = (doctorList, doctorId) => {
  let doctor = doctorList.find(({ id }) => id === doctorId);
  if (doctor) {
    return `ID ${doctor.id} - ${doctor.firstName} ${doctor.lastName}`;
  } else {
    return "Unknown doctor";
  }
};

module.exports = {
  renderGender: renderGender,
  renderService: renderService,
  renderBranch: renderBranch,
  renderAllCode: renderAllCode,
  renderClinicInfo: renderClinicInfo,
  renderPatient: renderPatient,
  renderDoctor: renderDoctor,
};
