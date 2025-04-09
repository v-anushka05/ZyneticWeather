import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; 
import ErrorBoundary from './ErrorBoundary.js'; 
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
