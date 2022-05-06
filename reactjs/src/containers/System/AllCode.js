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
  let item = allCode.find(({ key }) => key === keyCode.toString());
  if (item) {
    return item.value;
  } else {
    return "Unknown key code";
  }
};

module.exports = {
  renderGender: renderGender,
  renderService: renderService,
  renderBranch: renderBranch,
  renderAllCode: renderAllCode,
  renderClinicInfo: renderClinicInfo,
};
