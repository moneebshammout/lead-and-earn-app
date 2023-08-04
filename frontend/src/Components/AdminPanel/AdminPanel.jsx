import UserTable from '../UserTable/UserTable';
import { useState, useEffect } from 'react';
import { getAllUsers, getSystemOverview } from '../../Service/admin.service';
import SystemOverview from '../SystemOverView/SystemOverView';
export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [systemData, setSystemData] = useState({});

  useEffect(() => {
    async function fetchUsers() {
      const response = await Promise.all([getAllUsers(), getSystemOverview()]);
      setUsers(response[0]);
      setSystemData(response[1]);
    }
    fetchUsers();
  }, []);

  return (
    <>
      <div>
        <UserTable users={users} />
        <br />
        <br />
        <SystemOverview data={systemData} />
      </div>
    </>
  );
}
