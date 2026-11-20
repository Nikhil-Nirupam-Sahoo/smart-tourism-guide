import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DarkModeProvider } from './context/DarkModeContext';
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
import Admin from './pages/Admin';

import { Toaster } from 'react-hot-toast';

function ToastPosition() {
  return <Toaster position="top-right" richColors />;
}

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

function AdminRoute({ children }) {
  const { user, loading, isAuthenticated } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Admin access required</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Your account doesn't have admin privileges yet. Sign out and sign back in once to refresh your role.
        </p>
        <Link to="/" className="btn btn-outline">Back to home</Link>
      </div>
    );
  }
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
      <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
      <Route path="/trips/:id" element={<ProtectedRoute><TripDetail /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/trip-shared/:token" element={<TripDetail />} />
      <Route
        path="/admin"
        element={<AdminRoute><Admin /></AdminRoute>}
      />
      <Route
        path="*"
        element={
          <div className="max-w-xl mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Page not found</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">That page doesn't exist.</p>
            <Link to="/" className="btn btn-outline">Back to home</Link>
          </div>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <div className="min-h-screen transition-colors duration-300">
          <Navbar />
          <AppRoutes />
          <ToastPosition />
          <ChatWidget />
        </div>
      </DarkModeProvider>
    </AuthProvider>
  );
}
