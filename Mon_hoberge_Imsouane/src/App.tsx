import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import Chatbot from './components/Chatbot';
import AdminLogin from './AdminLogin';
import Dashboard from './components/Dashboard';
import RoomsAdmin from './components/RoomsAdmin';
import ActiviteAdmin from './components/ActiviteAdmin';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Routes publiques avec Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chambres" element={<RoomsPage />} />
          <Route path="/activites" element={<ActivitiesPage />} />
          <Route path="/reservation" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Routes admin protégées */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/rooms" element={
          <PrivateRoute>
            <RoomsAdmin />
          </PrivateRoute>
        } />
        <Route path="/activitiesadd" element={
          <PrivateRoute>
            <ActiviteAdmin />
          </PrivateRoute>
        } />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;