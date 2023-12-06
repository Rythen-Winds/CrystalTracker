import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthProvider from './DB/AuthProvider.tsx';
import Routes from './routes/Router.tsx';
import './index.css';

const App = () => {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
