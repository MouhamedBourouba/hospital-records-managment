import {
  LuBaby,
  LuBuilding,
  LuHospital,
  LuLogOut,
  LuUsers,
  LuX,
} from "react-icons/lu";

export const SIDE_MENU_HOSPITAL = [
  {
    id: "02",
    label: "Death records",
    icon: LuX,
    path: "/hospital/death-records",
  },
  {
    id: "03",
    label: "Birth records",
    icon: LuBaby,
    path: "/hospital/birth-records",
  },
  {
    id: "03",
    label: "Doctors",
    icon: LuUsers,
    path: "/hospital/users",
  },
  {
    id: "05",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];

export const SIDE_MENU_ASP = [
  {
    id: "01",
    label: "Verify Birth Records",
    icon: LuBaby,
    path: "/asp/birth-records",
  },
  {
    id: "02",
    label: "Verify Death Records",
    icon: LuX,
    path: "/asp/death-records",
  },
  {
    id: "03",
    label: "Add employees",
    icon: LuUsers,
    path: "/asp/employees",
  },
  {
    id: "04",
    label: "Add Hospitals",
    icon: LuHospital,
    path: "/asp/hospitals",
  },
  {
    id: "05",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];

export const SIDE_MENU_DSP = [
  {
    id: "01",
    label: "Death Records",
    icon: LuX,
    path: "/user/dashboard",
  },
  {
    id: "02",
    label: "Birth Records",
    icon: LuBaby,
    path: "/user/dashboard",
  },
  {
    id: "03",
    label: "Add ASP",
    icon: LuBuilding,
    path: "/user/dashboard",
  },
  {
    id: "04",
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
