// /utils/auth.js

// Hardcoded mock user credentials for demonstration purposes
const users = [
    {
      username: 'admin',
      password: 'password123',  // Simple hardcoded password for mock authentication
    },
  ];
  
  // Function to authenticate a user based on username and password
  export const authenticateUser = (username, password) => {
    const user = users.find((user) => user.username === username);
  
    if (user && user.password === password) {
      return true;  // User is authenticated
    } else {
      return false; // Authentication failed
    }
  };
  