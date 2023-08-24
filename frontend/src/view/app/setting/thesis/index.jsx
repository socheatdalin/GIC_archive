import { Box } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import List from './List';
import Material from './material'
import MaterialByID from './materialByID'

export default function Courses() {
  const { url } = useRoutes();
  return (
    <Box>
      <Routes>
        <Route path={`${url}/list`} component={List} />
        {/* <Route path={`${url}/materials`} component={Material} /> */}
        <Route path={`${url}/:course_id/materials`} component={Material}/>
        <Route path={`${url}/:course_id/material/:id`} component={MaterialByID} />
      </Routes>
    </Box>
  );
}
