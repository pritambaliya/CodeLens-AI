import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import AnimatedBackground from '../components/AnimatedBackground';
import PageTransition from '../components/PageTransition';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); ''
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(form);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:5000/auth/github";
  };
  return (
    <PageTransition className="relative flex min-h-screen items-center justify-center bg-background px-4">
      <AnimatedBackground />
      <div className="absolute left-6 top-6 z-20">
        <Button
          variant="ghost"
          type="button"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>

              <span className="text-2xl font-bold text-white">
                CodeLens
              </span>
            </Link>

            <h1 className="text-2xl font-bold text-white">
              Welcome back
            </h1>
          </div>

          <p className="mt-3 text-sm text-text-muted">
            Sign in to continue reviewing your code
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card glow-purple space-y-5 rounded-2xl p-8">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-text-muted outline-none transition-colors focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-text-muted">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-text-muted outline-none transition-colors focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50"
              placeholder="Enter your password"
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-2"
            loading={loading}
            disabled={loading}
          >
            Sign In
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>

            <div className="relative flex justify-center">
              <span className="bg-[#141821] px-4 text-sm text-text-muted">
                OR
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition hover:border-violet-500/50 hover:bg-white/10"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <button
            type="button"
            onClick={handleGithubLogin}
            className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition hover:border-violet-500/50 hover:bg-white/10"
          >
            <FaGithub size={22} />
            Continue with GitHub
          </button>

          <p className="pt-4 text-center text-sm text-text-muted">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-violet-400 hover:text-violet-300"
            >
              Create one
            </Link>
          </p>
        </form>
      </motion.div>
    </PageTransition>
  );
}
