import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import UseState from './useState/';
import UseEffect from './useEffectnLayout';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/use-state">useState()</Link>
        </li>
        <li>
          <Link to="/use-effect">useEffect() / useLayoutEffect()</Link>
        </li>
      </ul>

      <Switch>

        <Route exact path="/use-state">
          <UseState />
        </Route>
        <Route exact path="/use-effect">
          <UseEffect />
        </Route>

      </Switch>
    </Router>
  );
};

export default App;
