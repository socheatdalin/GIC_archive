import { BiChild, BiMedal, BiDoorOpen, BiBookBookmark } from "react-icons/bi";
export const MenuConstants = [
  {
    // name: 'LIST',
    item: [
      {
        id: "dashboard",
        name: "Dashboard",
        path: "/home1/dashboard",
        icon: <BiMedal />,
      },
      {
        id: "thesis",
        name: "Thesis",
        path: "/home1/thesis/list",
        icon: <BiDoorOpen />,
      },
      {
        id: "classproject",
        name: "Class project",
        path: "/home1/project/list",
        icon: <BiBookBookmark />,
      },
    ],
  },
  {
    name: "SETTING",
    item: [
      {
        id: "students",
        name: "Student",
        path: "/home1/student",
        icon: <BiChild />,
      },
    ],
  },
];
