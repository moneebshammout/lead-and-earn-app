import Root from './Components/Root/Root';
import AuthForm from './Components/AuthForm/AuthForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/**
 * Create App component.
 *
 * @return {JSX}  App component.
 */
function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Root} />
          <Route path="/auth/:source?" component={AuthForm} />
        </Switch>
    </Router>
  );
}

export default App;
