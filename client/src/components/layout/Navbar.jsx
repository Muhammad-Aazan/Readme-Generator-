import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Sparkles, LogOut, User, Shield } from 'lucide-react';
import { Github } from '../common/Icons';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const isCurrent = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-dark-border bg-dark-bg/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-brand-400 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              README<span className="text-purple-400 font-semibold">.gen</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/generator"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isCurrent('/generator')
                  ? 'bg-purple-600/15 text-purple-400 border border-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-dark-surface'
              }`}
            >
              Generator
            </Link>
            <Link
              to="/templates"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isCurrent('/templates')
                  ? 'bg-purple-600/15 text-purple-400 border border-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-dark-surface'
              }`}
            >
              Templates
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isCurrent('/dashboard')
                      ? 'bg-purple-600/15 text-purple-400 border border-purple-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-dark-surface'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/readmes"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isCurrent('/readmes')
                      ? 'bg-purple-600/15 text-purple-400 border border-purple-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-dark-surface'
                  }`}
                >
                  My READMEs
                </Link>
                <Link
                  to="/github"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isCurrent('/github')
                      ? 'bg-purple-600/15 text-purple-400 border border-purple-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-dark-surface'
                  }`}
                >
                  GitHub Sync
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-amber-400 hover:bg-amber-500/10 flex items-center gap-1.5"
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-card border border-dark-border text-sm font-medium text-slate-200 hover:border-purple-500/50 transition-colors"
                >
                  <User className="w-4 h-4 text-purple-400" />
                  <span className="hidden sm:inline">{user?.name || user?.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-dark-card transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20 transition-all"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;