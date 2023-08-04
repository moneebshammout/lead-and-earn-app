import { useHistory } from 'react-router-dom';
import { isAuthenticated } from '../../utils/user.utils';
import { useEffect } from 'react';
import ClientTable from '../ClientTable/ClientTable';
export default function MyClients() {
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push('/auth');
    }
  }, [history]);

  return <ClientTable />;
}
