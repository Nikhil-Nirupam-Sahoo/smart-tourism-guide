import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  MapPin,
  Plane,
  MessageSquare,
  User,
  LogOut,
  Compass,
  Settings,
  Shield,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDarkMode } from '../context/DarkModeContext';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-sky-200">
              <Compass size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Smart<span className="text-sky-500">Guide</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" label="Home" icon={<Compass size={18} />} active={isActive('/')} />
            <NavLink to="/destinations" label="Destinations" icon={<MapPin size={18} />} active={isActive('/destinations')} />
            <NavLink to="/trips" label="My Trips" icon={<Plane size={18} />} active={isActive('/trips')} />
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('chat-toggle')?.click();
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              id="chat-toggle"
            >
              <MessageSquare size={16} /> <span className="text-sm font-medium">Chat</span>
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <DarkModeToggle />
            {isAuthenticated ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <Shield size={16} /> Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <LogOut size={16} /> Sign out
                </button>
                <Link to="/profile" className="btn btn-primary text-sm">
                  <User size={16} /> Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-400">
                  Sign in
                </Link>
                <Link to="/register" className="btn btn-primary text-sm">
                  Get started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 border-t border-slate-100 pt-4 space-y-2">
            <NavLink to="/" label="Home" icon={<Compass size={18} />} active={isActive('/')} mobile />
            <NavLink to="/destinations" label="Destinations" icon={<MapPin size={18} />} active={isActive('/destinations')} mobile />
            <NavLink to="/trips" label="My Trips" icon={<Plane size={18} />} active={isActive('/trips')} mobile />
            {isAuthenticated ? (
              <>
                <NavLink to="/profile" label="Profile" icon={<User size={18} />} active={isActive('/profile')} mobile />
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <LogOut size={16} className="mr-2" /> Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
                  Sign in
                </Link>
                <Link to="/register" className="block px-4 py-2 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-lg text-center">
                  Get started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ to, label, icon, active, mobile }) {
  const isActiveRoute = active;
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActiveRoute
          ? 'bg-sky-50 text-sky-700'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      } ${mobile ? '' : 'whitespace-nowrap'}`}
    >
      {icon}
      {label}
    </Link>
  );
}
