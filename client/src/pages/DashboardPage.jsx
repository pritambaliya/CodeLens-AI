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
import { getReviews, deleteReviewById } from '../services/reviewService';
import { getAllHistory } from '../services/historyService';
import { Trash2 } from "lucide-react";
import ConfirmModal from '../components/ConfirmCard';

export default function DashboardPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyReviews, setHistoryReviews] = useState([]);
  const [stats, setStats] = useState({
    totalReviews: 0,
    normalReviews: 0,
    reReviews: 0,
  });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await getAllHistory();

      setStats({
        totalReviews: history.length,
        normalReviews: history.filter(r => r.version === 1).length,
        reReviews: history.filter(r => r.version > 1).length,
      });
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        const historyData = await getAllHistory();
        setReviews(Array.isArray(data) ? data : data.reviews || []);
        setHistoryReviews(historyData);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const groupedHistory = historyReviews.reduce((acc, history) => {
    const reviewId = history.reviewId._id;

    if (!acc[reviewId]) {
      acc[reviewId] = {
        review: history.reviewId,
        histories: [],
      };
    }

    acc[reviewId].histories.push(history);

    return acc;
  }, {});

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


  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteReviewById(selectedReviewId);

      setDeleteOpen(false);
      setSelectedReviewId(null);

      await loadHistory();
    } catch (error) {
      console.error(error);
      alert("Failed to delete review.");
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    const history = await getAllHistory();
    setHistoryReviews(history);

    setStats({
      totalReviews: history.length,
      normalReviews: history.filter(r => r.version === 1).length,
      reReviews: history.filter(r => r.version > 1).length,
    });
  };

  const loadReviews = async () => {
    const data = await getReviews();
    setReviews(Array.isArray(data) ? data : data.reviews || []);
  };

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
            <Card hover={true} glow>
              <p className="text-sm text-text-muted">Total Reviews</p>
              <p className="mt-2 text-3xl font-bold gradient-text">{stats.totalReviews}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card hover={true} glow>
              <p className="text-sm text-text-muted">Languages Analyzed</p>
              <p className="mt-2 text-3xl font-bold text-white">{languages.length}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card hover={true} glow>
              <p className="text-sm text-text-muted">Reviews Count</p>
              <p className="mt-2 text-3xl font-bold text-white">{stats.normalReviews}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card hover={true} glow>
              <p className="text-sm text-text-muted">Re-Reviews Count</p>
              <p className="mt-2 text-3xl font-bold text-white">{stats.reReviews}</p>
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
                          {review.createdAt ? new Date(review.createdAt).toLocaleDateString("en-GB") : 'Recent'}
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

        <div className="mt-8">
          <Card hover={false}>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  History of Code
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                  Browse all previous versions of your code reviews.
                </p>
              </div>
            </div>

            {Object.keys(groupedHistory).length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-text-muted">
                  No review history available.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.values(groupedHistory).map((group) => (
                  <div
                    key={group.review._id}
                    className="rounded-xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {group.review.title}
                        </h3>

                        <p className="text-sm text-text-muted">
                          {group.review.language}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/reviews/${group.review._id}`}
                          className="rounded-lg bg-violet-600 px-4 py-2 text-sm text-white transition hover:bg-violet-700"
                        >
                          Latest Review
                        </Link>

                        <button
                          onClick={() => {
                            setSelectedReviewId(group.review._id);
                            setDeleteOpen(true);
                          }}
                          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                        <ConfirmModal
                          open={deleteOpen}
                          onClose={() => {
                            setDeleteOpen(false);
                            setSelectedReviewId(null);
                          }}
                          onConfirm={handleDelete}
                          loading={loading}
                          title="Delete Review"
                          description="This action cannot be undone."
                          message="Are you sure you want to permanently delete this review and all its history?"
                          confirmText="Delete"
                          icon="delete"
                        />
                      </div>
                    </div>

                    <div className="ml-4 space-y-2 border-l border-white/10 pl-4">
                      {group.histories
                        .sort((a, b) => b.version - a.version)
                        .map((history, index) => (
                          <Link
                            key={history._id}
                            to={`/review/history/${history._id}`}
                            className="flex items-center justify-between rounded-lg bg-white/5 p-3 transition hover:bg-white/10"
                          >
                            <div>
                              <p className="font-medium text-white">
                                Version {history.version}

                                {index === 0 && (
                                  <span className="ml-2 rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">
                                    Latest Snapshot
                                  </span>
                                )}
                              </p>

                              <p className="text-xs text-text-muted">
                                {new Date(history.createdAt).toLocaleString("en-GB")}
                              </p>
                            </div>

                            <svg
                              className="h-5 w-5 text-text-muted"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

      </main>
    </PageTransition>
  );
}
