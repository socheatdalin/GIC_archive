import { BiCalendar, BiDoorOpen, BiBookBookmark } from 'react-icons/bi';
export const MenuConstants = [
  {
    // name: 'LIST',
    item: [
      // {
      //   id: 'dashboard',
      //   name: 'Dashboard',
      //   path: '/home/dashboard',
      //   icon: <BiMedal />,
      // },
      {
        id: 'years',
        name: 'Year',
        path: '/home/year',
        icon: <BiCalendar />,
      },
      {
        id: 'thesis',
        name: 'Thesis',
        path: '/home/thesis/list',
        icon: <BiDoorOpen />,
      },
      {
        id: 'classproject',
        name: 'Class project',
        path: '/home/project/list',
        icon: <BiBookBookmark />,
      },
    ],
  },
  // {
  //   name: 'SETTING',
  //   item: [
  //     {
  //       id: 'teachers',
  //       name: 'Teacher',
  //       path: '/home/teacher',
  //       icon: <BiMale />,
  //     },
  //     {
  //       id: 'students',
  //       name: 'Student',
  //       path: '/home/student',
  //       icon: <BiChild />,
  //     },
     
  //   ],
  // },
];
