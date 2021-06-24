import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Calendar from '../views/doctor/calendar';

// import GuestOnePayment from '../views/guest/one-payment';

function MainLayout() {

  return (<Router basename={''}>
    <Switch>
      <Route path={'/'} component={Calendar}/>
    </Switch>
  </Router>);
}

export default MainLayout;
