import {
  LuLayoutDashboard,
  LuLogOut,
  LuSquarePlus,
  LuUsers,
  LuBaby,
  LuUserPlus
} from "react-icons/lu";
import { IoPersonAdd } from "react-icons/io5";
import { GiCoffin } from "react-icons/gi";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    id: "02",
    label: "Add Record",
    icon: LuSquarePlus,
    path: "/admin/add-record",
  },
  {
    id: "03",
    label: "All Employees",
    icon: LuUsers,
    path: "/admin/users",
  },
  {
    id: "05",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];

export const SIDE_MENU_USER_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/user/dashboard",
  },
  {
    id: "02",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];

export const SIDE_MENU_HOSPITAL_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/hospital/dashboard",
  },
  // {
  //   id: "02",
  //   label: "Add Birth",
  //   icon: LuSquarePlus,
  //   path: "/hospital/add-birth",
  // },
  // {
  //   id: "03",
  //   label: "Add Death",
  //   icon: LuSquarePlus,
  //   path: "/hospital/add-death",
  // },
  {
    id: "02",
    label: "Birth Records",
    icon: LuBaby,
    path: "/hospital/birth-records",
  },
  {
    id: "03",
    label: "Death Records",
    icon: GiCoffin,
    path: "/hospital/death-records",
  },
  {
    id: "04",
    label: "Add Employee",
    icon: LuUserPlus,
    path: "/hospital/add-employee",
  },
  {
    id: "05",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];

export const PRIORITY_DATA = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
];

export const STATUS_DATA = [
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
]
