import { Box } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import List from './List';
import { useNavigate } from 'react-router-dom';

export default function Year() {
  const { url } = useRoutes();

  const navigate = useNavigate();

  // Redirect to a specific URL
  const redirectToPage = () => {
    navigate('/year/list'); // Replace '/new-url' with the desired URL
  };
  return (
    <Box>
      <Routes>
        <Route path={`${url}/list`} component={List} />
        <Redirect to={`${url}/list`} />
        {/* <button onClick={redirectToPage}></button> */}
      </Routes>
    </Box>
  );
}
