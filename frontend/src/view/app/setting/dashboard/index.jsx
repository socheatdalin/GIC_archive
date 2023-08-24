import { Box } from '@chakra-ui/react';
import React from 'react'
import { Route, Routes, useRoutes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddEdit from './AddEdit';
import List from './List'
// import Routes from '../../../../routes';

export default function Dashboard() {
  const { url } = useRoutes();
  const navigate = useNavigate();

  const redirectToPage = () => {
    navigate('dashboard/list'); // Replace '/new-url' with the desired URL
  };
  return (
    <Box>
      <Routes>
        
        <Route path={`${url}/list`} component={List} />
        {/* <Route path={`${url}/add`} component={AddEdit} />
        <Route path={`${url}/view/:id`} component={AddEdit} /> */}
        <Route path={`${url}/edit`} component={AddEdit} />
        {/* <Redirect to={`${url}/list`} /> */}
        <button onClick={redirectToPage}></button>
      </Routes>
    </Box>
  )
}
