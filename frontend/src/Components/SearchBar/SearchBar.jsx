import { useState, useEffect } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { getAllUsers } from '../../Service/admin.service';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleInputChange = async (e) => {
    if (e.target.value === '') {
      setFilteredUsers([]);
      setSearchInput('');
      return;
    }
    setSearchInput(e.target.value);
    const response = await getAllUsers(`?search=${searchInput}`);
    setFilteredUsers(response);
  };

  const handleUserClick = (user) => {
    window.location.href = `/admin/user/${user.id}`;
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="searchInput">
          <Form.Label>Search Users:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a name or email..."
            value={searchInput}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
      <ListGroup>
        {filteredUsers.map((user) => (
          <ListGroup.Item key={user.id} onClick={() => handleUserClick(user)}>
            <strong>Name:</strong> {user.name}, <strong>Email:</strong>{' '}
            {user.email}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
