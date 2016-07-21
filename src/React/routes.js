import React from 'react'
import {browserHistory, Router, Route, Redirect} from 'react-router'

import makeMainRoutes from './views/Main/routes'

const Home = React.createClass({
  render: function () {
    return (
      <div>
        Hello Wordedawaweefsefld
      </div>
    );
  }
});

export const makeRoutes = () => {
  const main = makeMainRoutes();

  return (
    <Router path=''>
      {main}
    </Router>
  );
}

export default makeRoutes;
