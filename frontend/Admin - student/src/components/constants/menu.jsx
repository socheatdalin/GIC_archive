import {  BiChild, BiMedal, BiDoorOpen, BiBookBookmark } from 'react-icons/bi';
export const MenuConstants = [
  {
    // name: 'LIST',
    item: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        path: '/dashboard',
        icon: <BiMedal />,
      },
      {
        id: 'thesis',
        name: 'Thesis',
        path: '/thesis/list',
        icon: <BiDoorOpen />,
      },
      {
        id: 'classproject',
        name: 'Class project',
        path: '/project/list',
        icon: <BiBookBookmark />,
      },
    ],
  },
  {
    name: 'SETTING',
    item: [
      {
        id: 'students',
        name: 'Student',
        path: '/student',
        icon: <BiChild />,
      },
    ],
  },
];
