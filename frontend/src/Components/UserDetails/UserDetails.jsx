import { useState, useEffect } from 'react';
import { getAllUsers } from '../../Service/admin.service';
import { ListGroup } from 'react-bootstrap';
export default function UserDetails(props) {
  const { id } = props.match.params;
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const response = await getAllUsers(`?id=${id}`);
      setUser(response[0]);
    }
    fetchUsers();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ left: '30%', top: '30%', position: 'absolute' }}>
      <ListGroup>
        {Object.keys(user).map((key) => {
          return (
            <ListGroup.Item key={user.id}>
              <strong>
                {key}: {user[key]}
              </strong>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
