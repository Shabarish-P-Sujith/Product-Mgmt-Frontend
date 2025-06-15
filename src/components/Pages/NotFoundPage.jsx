// import React from 'react'

// const NotFoundPage = () => {
//   return (
//     <div>
//       <h1>404 - Page Not Found</h1>
//     </div>
//   )
// }

// export default NotFoundPage;

import React from 'react';
import NotFoundPageNavbar from '../Navbar/NotFoundPageNavbar';

const NotFoundPage = () => {
  return (
    <div>
      <NotFoundPageNavbar />
      <div className="container">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
