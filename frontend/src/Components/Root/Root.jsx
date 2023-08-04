import Body from '../Body/Body';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Root() {
  const history = useHistory();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      history.push('/auth');
    }
  }, [history]);

  return (
    <div>
      <Body />
    </div>
  );
}
