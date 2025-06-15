import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPageNavbar from '../Navbar/LoginPageNavbar';
import { login } from '../auth/authService';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        toast.error('Please enter both email and password.');
        return;
      }

      const user = await login(email, password);
      toast.success('Login successful!');
      
      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin-products');
      } else {
        navigate('/user-products');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <LoginPageNavbar />

      <div className='container'>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;