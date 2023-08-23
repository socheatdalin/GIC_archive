import List from './List';
import { Routes, Route, useRoutes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
// import AddEdit from './AddEdit';
// import { useNavigate } from 'react-router-dom';

export default function Student() {
  const { url } = useRoutes();
  // const navigate = useNavigate();
  return (
    <Box>
      <Routes>
        <Route path={`${url}/list`} component={List} />
        {/* <Route path={`${url}/add`} component={AddEdit} />
        <Route path={`${url}/view/:id`} component={AddEdit} />
        <Route path={`${url}/edit/:id`} component={AddEdit} /> */}
        <Routes to={`${url}/list`} />
      </Routes>
    </Box>
  );
}
