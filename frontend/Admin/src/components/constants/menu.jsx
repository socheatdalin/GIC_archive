import { BiBook, BiCalendar, BiChild, BiMale, BiMedal, BiListCheck, BiDoorOpen, BiBookBookmark } from 'react-icons/bi';
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
        id: 'years',
        name: 'Year',
        path: '/year',
        icon: <BiCalendar />,
      },
      {
        id: 'courses',
        name: 'Courses',
        path: '/course/list',
        icon: <BiBook />,
      },
      {
        id: 'schedules',
        name: 'Timetable',
        path: '/timetable/list',
        icon: <BiListCheck />,
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
        id: 'teachers',
        name: 'Teacher',
        path: '/teacher',
        icon: <BiMale />,
      },
      {
        id: 'students',
        name: 'Student',
        path: '/student',
        icon: <BiChild />,
      },
      {
        id: 'academic',
        name: 'Academic',
        path: '/academic',
        icon: <BiMedal />,
      },
    ],
  },
];
