/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { renderRoutes } from 'react-router-config';

export default ({ route }) => {
  return <>{route && renderRoutes(route.routes)}</>;
};
