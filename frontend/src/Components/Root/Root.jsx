import AdminPanel from '../AdminPanel/AdminPanel';
import Dashboard from '../Dashboard/Dashboard';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../../utils/user.utils';
export default function Root() {
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push('/auth');
    }
  }, [history]);

  return (
    <>
      {getUserRole() === 'admin' && <AdminPanel />}
      {getUserRole() === 'user' && <Dashboard />}
    </>
  );
}
