export const getStoredUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  export const setStoredUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const removeStoredUser = () => {
    localStorage.removeItem('user');
  };