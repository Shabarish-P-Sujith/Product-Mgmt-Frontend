import React from 'react';
import HomePageNavbar from '../Navbar/HomePageNavbar';

const HomePage = () => {
  return (
    <div>
      <HomePageNavbar />
      <div className='container'>
        <h1>Welcome to Product Manager</h1>
        <p>This is a simple product management app.</p>
        <p>Login or Sign up to get started managing your products easily!</p>
      </div>
    </div>
  );
}

export default HomePage;
