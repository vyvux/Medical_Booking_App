export const adminMenu = [
  {
    //system
    name: "menu.system.header",
    menus: [
      // {
      //   name: "menu.system.system-administrator.header",
      //   subMenus: [
      {
        name: "menu.system.admin.user-manage",
        link: "/admin/user-manage",
      },
      {
        name: "menu.system.admin.branch-manage",
        link: "/admin/branch-manage",
      },
      {
        name: "menu.system.admin.service-manage",
        link: "/admin/service-manage",
      },
      {
        name: "menu.system.admin.doctor-manage",
        link: "/admin/doctor-manage",
      },
      {
        name: "menu.system.admin.patient-manage",
        link: "/admin/patient-manage",
      },
      {
        name: "menu.system.admin.log-manage",
        link: "/admin/log-manage",
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.system.header",
    menus: [
      {
        name: "menu.system.doctor.appointment-manage",
        link: "/doctor/appointment-manage",
      },
      {
        name: "menu.system.doctor.schedule-manage",
        link: "/doctor/schedule-manage",
      },
    ],
  },
];

export const medicalStaffMenu = [
  {
    name: "menu.system.header",
    menus: [
      {
        name: "menu.system.medical-staff.appointment-manage",
        link: "/staff/appointment-manage",
      },
      {
        name: "menu.system.medical-staff.patient-manage",
        link: "/staff/patient-manage",
      },
      {
        name: "menu.system.medical-staff.schedule-manage",
        link: "/staff/schedule-manage",
      },
    ],
  },
];
