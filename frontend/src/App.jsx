import Root from './Components/Root/Root';
import MyClients from './Components/MyClients/MyClients';
import AuthForm from './Components/AuthForm/AuthForm';
import NavBar from './Components/NavBar/NavBar';
import UserDetails from './Components/UserDetails/UserDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';

/**
 * Create App component.
 *
 * @return {JSX}  App component.
 */
function App() {
  const NavbarWithRouter = withRouter(NavBar);
  return (
    <>
      <Router>
        <NavbarWithRouter />
        <Switch>
          <Route exact path="/" component={Root} />
          <Route path="/auth/:source?" component={AuthForm} />
          <Route exact path="/my-clients" component={MyClients} />
          <Route exact path="/admin/user/:id" component={UserDetails} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
