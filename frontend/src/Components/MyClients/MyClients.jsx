import { useHistory } from 'react-router-dom';
import { isAuthenticated } from '../../utils/user.utils';
import { useEffect } from 'react';
export default function MyClients() {
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push('/auth');
    }
  }, [history]);
  
  return <div>This is MyClients</div>;
}
