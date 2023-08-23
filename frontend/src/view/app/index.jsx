import { Box, Flex } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import SplashScreen from '../../components/loader/SplashScreen';

const DelayImport = (path) => {
  return React.lazy(() => {
    return Promise.all([
      path,
      new Promise((resolve) => setTimeout(resolve, 300)),
    ]).then(([moduleExports]) => moduleExports);
  });
};

//List
const Student = DelayImport(import('./setting/student'));

const Year = DelayImport(import('./setting/year'));

const Dashboard = DelayImport(import('./setting/dashboard'));

const Thesis = DelayImport(import('./setting/thesis'));


const routeItem = [
  {
    path: '/home1/student',
    element: <Student />,
  },
  {
    path: '/home1/year',
    element: <Year />,
  },
  {
    path: '/home1/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/home1/thesis',
    element: <Thesis />,
  },
];

const MotionBox = motion(Box);

export default function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<SplashScreen />}>
      <Flex position="relative" h="100vh" overflow="auto">
        <Box display="flex">
          <Sidebar />
        </Box>
        <Box
          w={'calc(100% - 18rem)'}
          p="10"
          bgColor="#f0f5f8"
          position="relative"
          flex="1"
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {routeItem.map(({ path, element }) => (
                <Route key={path} path={path}>
                  <MotionBox
                    h="full"
                    overflow="auto"
                    rounded="md"
                    key={location.pathname}
                    initial={{
                      y: -10,
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.2 },
                    }}
                    exit={{
                      y: -20,
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {element}
                  </MotionBox>
                </Route>
              ))}
            </Routes>
          </AnimatePresence>
        </Box>
      </Flex>
    </Suspense>
  );
}
