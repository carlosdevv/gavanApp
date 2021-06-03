import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { DetailPage } from '../pages/DetailPage';
import { HomePage } from '../pages/HomePage';
import { LibraryPage } from '../pages/LibraryPage';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/detail/:id" component={DetailPage} />
      <Route path="/Library" component={LibraryPage} />

    </Switch>
  );
};

export default Routes;
