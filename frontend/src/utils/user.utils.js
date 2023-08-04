/**
 * Checks if a user is authenticated
 *
 * @returns {boolean} true or false
 */
const isAuthenticated = () => {
  const userData = localStorage.getItem('user');
  console.log(userData);
  if (!userData) return false;
  const { token } = JSON.parse(userData);
  if (!token) return false;
  return true;
};

/**
 * Gets user role.
 * 
 * @returns {string} user role
 */
const getUserRole = () => {
  const userData = localStorage.getItem('user');
  if (!userData) return null;
  const { user } = JSON.parse(userData);
  const { role } = user;
  return role;
};


export { isAuthenticated, getUserRole };