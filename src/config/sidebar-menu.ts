export type SidebarMenu = {
  id: string;
  type: "divider" | "link";
  label: string;
  path?: string;
  icons?: string;
  active?: Array<string>;
  subMenu?: Array<SidebarMenu>;
};

const sidebarMenu: SidebarMenu[] = [
  {
    id: "dashboard",
    type: "link",
    path: "/",
    label: "Dashboard",
    icons: "/assets/images/sidebar/dashboard.png",
    active: ["/"],
  },
  {
    id: "registerSR",
    type: "link",
    path: "/seniorResidentForm",
    label: "Register Senior Resident",
    icons: "/assets/images/sidebar/addUser.png",
    active: ["/seniorResidentForm"],
  },
  {
    id: "srList",
    type: "link",
    path: "/srList",
    label: "Senior Resident List",
    icons: "/assets/images/sidebar/list.png",
    active: ["/srList"],
  },
  // {
  //   id: "scheduleSR",
  //   type: "link",
  //   path: "/scheduleSR",
  //   label: "Schedule SR",
  //   icons: "/assets/images/sidebar/rescheduling.png",
  //   active: ["/scheduleSR"],
  // },

  // {
  //   id: "clinicSchedule",
  //   type: "link",
  //   path: "/clinicSchedule",
  //   label: "Clinic Schedule",
  //   icons: "/assets/images/sidebar/addUser.png",
  //   active: ["/clinicSchedule"],
  // },
  {
    id: "masterData",
    type: "link",
    label: "Master Data",
    icons: "/assets/images/sidebar/database.png",
    active: ["/roomForm", "/approvedDoctor"],
    subMenu: [
      {
        id: "roomForm",
        type: "link",
        path: "/roomForm",
        label: "Register Room",
        active: ["/roomForm"],
      },
      {
        id: "approvedDoctor",
        type: "link",
        path: "/approvedDoctor",
        label: "Register Overseeing Doctor",
        active: ["/approvedDoctor"],
      },
    ],
  },
];

export default sidebarMenu;
