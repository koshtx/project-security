import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>We can't seem to find the page you're looking for.</p>
      <Link to="/">Go back to home</Link>
    </div>
  );
};

export default ErrorPage;