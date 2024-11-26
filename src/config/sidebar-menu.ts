import {
  ClockIcon,
  HomeIcon,
  ListBulletIcon,
  UserPlusIcon,
} from "@heroicons/react/16/solid";

export type SidebarMenu = {
  id: string;
  type: "divider" | "link";
  label: string;
  path?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  active?: Array<string>;
  subMenu?: Array<SidebarMenu>;
};

const sidebarMenu: SidebarMenu[] = [
  {
    id: "dashboard",
    type: "link",
    path: "/",
    label: "Dashboard",
    icon: HomeIcon,
    active: ["/"],
  },
  {
    id: "registerSR",
    type: "link",
    path: "/seniorResidentForm",
    label: "Register SR",
    icon: UserPlusIcon,
    active: ["/seniorResidentForm"],
  },
  {
    id: "scheduleSR",
    type: "link",
    path: "/scheduleSR",
    icon: ClockIcon,
    label: "Schedule SR",
    active: ["/scheduleSR"],
  },
  {
    id: "srList",
    type: "link",
    path: "/srList",
    icon: ListBulletIcon,
    label: "Senior Resident List",
    active: ["/srList"],
  },
  {
    id: "roomForm",
    type: "link",
    path: "/roomForm",
    icon: UserPlusIcon,
    label: "Room Form",
    active: ["/roomForm"],
  },
  {
    id: "approvedDoctor",
    type: "link",
    path: "/approvedDoctor",
    icon: UserPlusIcon,
    label: "Approved Doctor List",
    active: ["/approvedDoctor"],
  },
];

export default sidebarMenu;
