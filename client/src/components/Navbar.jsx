import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { NAV_LINKS } from '../utils/constants';
import Button from './Button';

export default function Navbar({ variant = 'landing' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const isDashboard = variant === 'dashboard';

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-40 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/30">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-white transition-colors group-hover:text-violet-300">
            CodeLens
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {!isDashboard &&
            NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-muted transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}

          {isDashboard && isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-text-muted transition-colors hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                to="/reviews/create"
                className="text-sm font-medium text-text-muted transition-colors hover:text-white"
              >
                New Review
              </Link>
              <Link
                to="/profile"
                className="text-sm font-medium text-text-muted transition-colors hover:text-white"
              >
                Profile
              </Link>
            </>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-text-muted">
                Hi, <span className="text-white">{user?.name || 'User'}</span>
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" to="/login">
                Login
              </Button>
              <Button size="sm" to="/register">
                Start Free
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-text-muted hover:bg-white/5 hover:text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 bg-background/95 md:hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-4">
              {!isDashboard &&
                NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-white/5 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}

              {isDashboard && isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className="rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-white/5 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/reviews/create"
                    className="rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-white/5 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    New Review
                  </Link>
                  <Link
                    to="/profile"
                    className="rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-white/5 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    Profile
                  </Link>
                </>
              )}

              <div className="mt-2 flex flex-col gap-2 border-t border-white/5 pt-4">
                {isAuthenticated ? (
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" to="/login">
                      Login
                    </Button>
                    <Button size="sm" to="/register">
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
