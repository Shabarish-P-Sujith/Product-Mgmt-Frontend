import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupPageNavbar from '../Navbar/SignupPageNavbar';
import { signup } from '../auth/authService';
import { toast } from 'react-toastify';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        toast.error('Please enter both email and password.');
        return;
      }

      const userData = {
        email,
        password,
        role
      };

      await signup(userData);
      toast.success('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <SignupPageNavbar />

      <div className='container'>
        <h2>Sign Up</h2>
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
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select><br /><br />
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignupPage;


