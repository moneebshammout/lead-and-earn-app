import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBContainer,
} from 'mdb-react-ui-kit';

import { getUserRole } from '../../utils/user.utils';
/**
 * Create NavBar component.
 *
 * @param {object} param0
 *
 * @returns {JSX.Element} NavBar component
 */
function NavBar() {
  const isAuthRoute = () => {
    return window.location.pathname.startsWith('/auth');
  };

  const userRole = getUserRole();

  return isAuthRoute() ? null : (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarNav right>
          {userRole === 'admin' && (
            <>
              <MDBNavbarItem>
                <MDBNavbarLink
                  href="/admin-panel"
                  active={window.location.pathname === '/admin-panel'}
                >
                  Admin Panel
                </MDBNavbarLink>
              </MDBNavbarItem>
            </>
          )}

          {userRole === 'user' && (
            <>
              <MDBNavbarItem>
                <MDBNavbarLink
                  href="/"
                  active={window.location.pathname === '/'}
                >
                  Dashboard
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  href="/my-clients"
                  active={window.location.pathname === '/my-clients'}
                >
                  My Clients
                </MDBNavbarLink>
              </MDBNavbarItem>
            </>
          )}
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavBar;
