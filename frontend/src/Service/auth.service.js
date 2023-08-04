const { VITE_API_URL } = import.meta.env;

/**
 * Authenticate user.
 *
 * @param {object} param0
 * @param {string} param0.email
 * @param {string} param0.password
 *
 * @return {Promise<object>}
 */
const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    console.log(response);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

/**
 * Register user in the system.
 * 
 * @param {FormData} param0
 *  
 @return {Promise<object>}
 */
const signup = async (form) => {
  const response = await fetch(`${VITE_API_URL}/auth/signup`, {
    method: 'POST',
    body: form,
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  return data;
};

export { login, signup, logout };
