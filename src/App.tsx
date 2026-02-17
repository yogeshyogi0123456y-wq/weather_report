import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import LandingPage from './pages/LandingPage';
import UserDetailsPage from './pages/UserDetailsPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<UserDetailsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
