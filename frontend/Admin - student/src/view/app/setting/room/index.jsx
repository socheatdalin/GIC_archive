import { Box } from '@chakra-ui/react';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import list from './list';

export default function Year() {
  const { url } = useRouteMatch();
  return (
    <Box>
      <Switch>
        <Route path={`${url}/list`} component={list} />
        {/* <Redirect to={`${url}/schedule`} /> */}
      </Switch>
    </Box>
  );
}
