import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Loader from '../components/Loader';
import PageTransition from '../components/PageTransition';
import { useAuth } from '../hooks/useAuth';
import { getReviews } from '../services/reviewService';

export default function DashboardPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(Array.isArray(data) ? data : data.reviews || []);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const languages = useMemo(() => {
    const counts = {};
    reviews.forEach((review) => {
      const lang = review.language || 'Unknown';
      counts[lang] = (counts[lang] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [reviews]);

  const recentReviews = reviews.slice(0, 5);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar variant="dashboard" />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="mt-1 text-text-muted">Welcome back, {user.user.name || 'Developer'}</p>
          </div>
          <Button to="/reviews/create">New Review</Button>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card hover={false} glow>
              <p className="text-sm text-text-muted">Total Reviews</p>
              <p className="mt-2 text-3xl font-bold gradient-text">{reviews.length}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card hover={false}>
              <p className="text-sm text-text-muted">Languages Analyzed</p>
              <p className="mt-2 text-3xl font-bold text-white">{languages.length}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card hover={false}>
              <p className="text-sm text-text-muted">Profile</p>
              <p className="mt-2 truncate text-lg font-semibold text-white">{user.user.name}</p>
              <p className="truncate text-sm text-text-muted">{user.user.email}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card hover={false}>
              <p className="text-sm text-text-muted">Reviews Count</p>
              <p className="mt-2 text-3xl font-bold text-white">{user.user.reviewsCount ?? reviews.length}</p>
            </Card>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card hover={false} className="h-full">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Recent Reviews</h2>
                <Button variant="ghost" size="sm" to="/reviews/create">
                  Create New
                </Button>
              </div>

              {recentReviews.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-text-muted">No reviews yet. Create your first code review!</p>
                  <Button className="mt-4" to="/reviews/create">
                    Start Reviewing
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentReviews.map((review) => (
                    <Link
                      key={review._id || review.id}
                      to={`/reviews/${review._id || review.id}`}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:border-violet-500/30 hover:bg-white/10"
                    >
                      <div>
                        <p className="font-medium text-white">{review.title}</p>
                        <p className="text-sm text-text-muted">
                          {review.language} &middot;{' '}
                          {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recent'}
                        </p>
                      </div>
                      <svg className="h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card hover={false} className="h-full">
              <h2 className="mb-6 text-lg font-semibold text-white">Languages Analyzed</h2>

              {languages.length === 0 ? (
                <p className="text-sm text-text-muted">No languages analyzed yet.</p>
              ) : (
                <div className="space-y-4">
                  {languages.map((lang) => (
                    <div key={lang.name}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="capitalize text-white">{lang.name}</span>
                        <span className="text-text-muted">{lang.count} review{lang.count !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500"
                          style={{ width: `${Math.min((lang.count / reviews.length) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
}
