import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Organizations, PhoneNumbers, Metrics, SMSForm} from './container';
import { images } from './components';
import SignIn from './container/auth/SignIn';
import AuthDetails from './container/AuthDetails';
import AppContent from './AppContent';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAuthenticated(true); // Example logic to set authentication status
    };

    // Call the function to check authentication status
    checkAuthStatus();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<MainApp isAuthenticated={isAuthenticated} />} />
      </Routes>
    </Router>
  );
};

const MainApp = ({ isAuthenticated }) => {
  return (
    <>
      <AuthDetails />
      {isAuthenticated ? <AppContent /> : <Navigate to="/signin" />} {/* Redirect logic */}
    </>
  );
};

export default App;
