import { getUserToken } from '../utils/user.utils';
const { VITE_API_URL } = import.meta.env;

/**
 * Get user dashboard data
 *
 * @returns {object}
 */
const getAllUsers = async (filters) => {
  const url = filters
    ? `${VITE_API_URL}/admin/users/` + filters
    : `${VITE_API_URL}/admin/users/`;
  const response = await fetch(url, {
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
 * Get user dashboard data
 *
 * @returns {object}
 */
const getSystemOverview = async () => {
  const response = await fetch(`${VITE_API_URL}/admin/system/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${getUserToken()}`,
    },
  });

  const data = await response.json();
  return data;
};

export { getAllUsers, getSystemOverview };
