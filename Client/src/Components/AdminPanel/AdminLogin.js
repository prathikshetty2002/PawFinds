import React, { useState, useEffect } from "react";
import AdminPanel from "./AdminPanel";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://pawfinds.onrender.com';
const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/credentials`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setUsersData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsersData();
  }, []);

  const handleLogin = () => {
    const user = usersData.username === username && usersData.password === password;
    if (user) {
      setLoginSuccess(true);
      setShowErrorMessage(false);
    } else {
      setLoginSuccess(false);
      setShowErrorMessage(true);
    }
  };

  return (
    <div>
      {loginSuccess ? (
        <AdminPanel />
      ) : (
        <div className="login-body">
          <div className="login-container">
            <h2>Admin Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              {showErrorMessage && (
                <p className="error-message">Incorrect username or password</p>
              )}
            <button className="float-right" onClick={handleLogin}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
