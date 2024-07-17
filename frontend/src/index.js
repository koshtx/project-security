import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import setupInterceptors from './setupInterceptors';

setupInterceptors();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);