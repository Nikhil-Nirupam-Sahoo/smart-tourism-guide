import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Trips from './pages/Trips';
import TripDetail from './pages/TripDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

import { Toaster } from 'react-hot-toast';

function ToastPosition() {
  return <Toaster position="top-right" richColors />;
}

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/destinations/:id" element={<DestinationDetail />} />
      <Route
        path="/trips"
        element={<ProtectedRoute><Trips /></ProtectedRoute>}
      />
      <Route
        path="/trips/:id"
        element={<ProtectedRoute><TripDetail /></ProtectedRoute>}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute><Profile /></ProtectedRoute>}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <AppRoutes />
        <ToastPosition />
        <ChatWidget />
      </div>
    </AuthProvider>
  );
}
