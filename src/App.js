import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import DashboardEmployer from './pages/DashboardEmployer';
import DashboardManager from './pages/DashboardManager';
import ManagersList from './pages/ManagersList';
import Leads from './pages/LeadsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/employer/dashboard" element={<DashboardEmployer />} />
        <Route path="/manager/dashboard" element={<DashboardManager />} />
        <Route path="/employer/managers" element={<ManagersList />} />
        <Route path="/manager/leads" element={<Leads />} />
      </Routes>
    </Router>
  );
}

export default App;
