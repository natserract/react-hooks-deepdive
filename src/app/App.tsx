import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import UseState from './useState/';
import UseEffect from './useEffectnLayout';
import UseContext from './useContext';
import UseReducer from './useReducer';

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
        <li>
          <Link to="/use-context">useContext()</Link>
        </li>
        <li>
          <Link to="/use-reducer">useReducer()</Link>
        </li>
      </ul>

      <Switch>

        <Route exact path="/use-state">
          <UseState />
        </Route>
        <Route exact path="/use-effect">
          <UseEffect />
        </Route>
        <Route exact path="/use-context">
          <UseContext />
        </Route>

        <Route exact path="/use-reducer">
          <UseReducer />
        </Route>

      </Switch>
    </Router>
  );
};

export default App;
