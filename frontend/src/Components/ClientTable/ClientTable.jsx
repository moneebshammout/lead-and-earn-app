import React, { useEffect, useState } from 'react';
import { getUserClients } from '../../Service/user.service';
import { getUserId } from '../../utils/user.utils';

const ClientTable = ({ id }) => {
  const [clients, setClients] = useState([]);
  const [expandedClients, setExpandedClients] = useState({});

  useEffect(() => {
    // Fetch the current user's clients when the component mounts
    async function getData() {
      const response = await getUserClients(id || getUserId());
      setClients(response);
    }
    getData();
  }, [id]);

  const handleExpand = async (clientId) => {
    if (!expandedClients[clientId]) {
      const expandedClientsData = await getUserClients(clientId);
      setExpandedClients({
        ...expandedClients,
        [clientId]: expandedClientsData,
      });
    }
  };

  const getRandomColor = () => {
    const colors = [
      '#F94144',
      '#F3722C',
      '#F8961E',
      '#F9C74F',
      '#90BE6D',
      '#43AA8B',
      '#577590',
      '#277DA1',
      '#DBDBDB',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      {clients.length === 0 ? (
        <div>User Has no clients</div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table
            className="table"
            style={{
              color: 'white',
              backgroundColor: getRandomColor(),
              width: '80%',
              margin: 'auto',
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <React.Fragment key={client.id}>
                  <tr
                    onClick={() => handleExpand(client.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{client.id}</td>
                    <td>{client.name}</td>
                  </tr>
                  {expandedClients[client.id] && (
                    <tr>
                      <td colSpan="3">
                        <ClientTable id={client.id} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ClientTable;
