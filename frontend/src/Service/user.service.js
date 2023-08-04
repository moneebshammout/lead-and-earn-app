import { getUserToken } from '../utils/user.utils';
const { VITE_API_URL } = import.meta.env;

/**
 * Get user dashboard data
 *
 * @returns {object}
 */
const getUserDashboardData = async () => {
  const response = await fetch(`${VITE_API_URL}/user/dashboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${getUserToken()}`,
    },
  });

  const data = await response.json();
  return data;
};

/**
 * Get user clients
 *
 * @param {number} id
 *
 * @returns {object}
 */
const getUserClients = async (id) => {
  const response = await fetch(`${VITE_API_URL}/user/clients/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${getUserToken()}`,
    },
  });

  const data = await response.json();
  return data;
};

export { getUserDashboardData, getUserClients };
