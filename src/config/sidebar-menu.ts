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
    label: "Senior Resident Form",
    icons: "/assets/images/sidebar/addUser.png",
    active: ["/seniorResidentForm"],
  },
  {
    id: "clinicSchedule",
    type: "link",
    path: "/clinicSchedule",
    label: "Clinic Schedule",
    icons: "/assets/images/sidebar/schedule.png",
    active: ["/clinicSchedule"],
  },
  {
    id: "scheduleSR",
    type: "link",
    path: "/scheduleSR",
    label: "Schedule Senior Resident",
    icons: "/assets/images/sidebar/rescheduling.png",
    active: ["/scheduleSR"],
  },
  {
    id: "srList",
    type: "link",
    path: "/srList",
    label: "Senior Resident List",
    icons: "/assets/images/sidebar/list.png",
    active: ["/srList"],
  },
  {
    id: "masterData",
    type: "link",
    label: "Master Data",
    icons: "/assets/images/sidebar/database.png",
    active: ["/roomForm", "/seniorDoctorForm", "/seniorDoctorList"],
    subMenu: [
      {
        id: "roomList",
        type: "link",
        path: "/roomList",
        label: "Clinic Room List",
        active: ["/roomList"],
      },
      {
        id: "approvedDoctor",
        type: "link",
        path: "/seniorDoctorForm",
        label: "Register Senior Doctor",
        active: ["/seniorDoctorForm"],
      },
      {
        id: "seniorDoctorList",
        type: "link",
        path: "/seniorDoctorList",
        label: "Senior Doctors List",
        icons: "/assets/images/sidebar/list.png",
        active: ["/seniorDoctorList"],
      },
    ],
  },
];

export default sidebarMenu;
