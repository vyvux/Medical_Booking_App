export const adminMenu = [
  {
    //system
    name: "menu.system.header",
    menus: [
      {
        name: "menu.system.system-administrator.header",
        subMenus: [
          {
            name: "menu.system.system-administrator.user-manage",
            link: "/system/user-manage",
          },
          {
            name: "menu.system.system-administrator.branch-manage",
            link: "/system/branch-manage",
          },
          {
            name: "menu.system.system-administrator.service-manage",
            link: "/system/service-manage",
          },
          {
            name: "menu.system.system-administrator.doctor-manage",
            link: "/system/doctor-manage",
          },
          {
            name: "menu.system.system-administrator.log-manage",
            link: "/system/log-manage",
          },
          {
            name: "menu.system.system-administrator.patient-manage",
            link: "/system/patient-manage",
          },
        ],
      },
      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },
];
