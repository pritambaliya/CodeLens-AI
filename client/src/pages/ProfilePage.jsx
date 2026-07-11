import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Loader from '../components/Loader';
import PageTransition from '../components/PageTransition';
import { useAuth } from '../hooks/useAuth';
import { getProfile, updateProfile, deleteProfile } from '../services/userService';
import { getFavorites } from '../services/favoriteService';
import { removeFavorite } from '../services/favoriteService';
import ConfirmModal from '../components/ConfirmCard';
import { getAllHistory } from '../services/historyService';
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user: authUser, refreshUser, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: null,
    avatarPreview: "",
  });
  const [stats, setStats] = useState({
    totalReviews: 0,
    normalReviews: 0,
    reReviews: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, favoritesData] = await Promise.all([
          getProfile(),
          getFavorites().catch(() => []),
        ]);
        setProfile(profileData.user || profileData);
        setFavorites(Array.isArray(favoritesData) ? favoritesData : favoritesData.favorites || []);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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


  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await removeFavorite(favoriteId);
      setFavorites((prev) => prev.filter((f) => (f._id || f.id) !== favoriteId));
      toast.success('Removed from favorites');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove favorite');
    }
  };

  const navigate = useNavigate();
  const handleDeleteAccount = async () => {
    try {
      setLoading(true);

      await deleteProfile();

      toast.success("Account deleted successfully.");

      setShowDeleteAccountModal(false);

      logout();
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account.");
    } finally {
      setLoading(false);
    }
  };

  const displayUser = profile || authUser;
  useEffect(() => {
    if (displayUser) {
      setFormData({
        name: displayUser.name || "",
        email: displayUser.email || "",
      });
    }
  }, [displayUser]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader size="lg" text="Loading profile..." />
      </div>
    );
  }


  const handleUpdateProfile = async () => {
    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);

      if (formData.avatar) {
        data.append("avatar", formData.avatar);
      }

      await updateProfile(data);
      const updated = await getProfile();
      setProfile(updated.user || updated);
      await refreshUser();
      toast.success("Profile updated");
      setEditModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only JPG, JPEG and PNG files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      avatar: file,
      avatarPreview: URL.createObjectURL(file),
    }));
  };


  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar variant="dashboard" />

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <p className="mt-1 text-text-muted">Manage your account and saved reviews</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card hover={false} glow className="md:col-span-2">
            <div className="flex items-center gap-6">
              {displayUser?.avatar?.url ? (
                <img
                  src={displayUser.avatar.url}
                  alt={displayUser.name}
                  className="h-20 w-20 rounded-2xl border-2 border-violet-500 object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-3xl font-bold text-white">
                  {displayUser?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold text-white">
                  {displayUser?.name}
                </h2>

                <p className="text-text-muted">
                  {displayUser?.email}
                </p>

                <p className="mt-2 text-sm text-violet-300">
                  {stats.normalReviews || 0} total review
                  {stats.normalReviews !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </Card>

          <div className="md:col-span-2 flex justify-end gap-3">
            <Button
              variant="primary"
              onClick={() => {
                setFormData({
                  name: displayUser?.name || "",
                  email: displayUser?.email || "",
                });
                setEditModalOpen(true)
              }}
            >
              Update Profile
            </Button>

            <Button
              variant="danger"
              onClick={() => setShowDeleteAccountModal(true)}
            >
              Delete Account
            </Button>
            <ConfirmModal
              open={showDeleteAccountModal}
              onClose={() => setShowDeleteAccountModal(false)}
              onConfirm={handleDeleteAccount}
              loading={loading}
              title="Delete Account"
              description="This action cannot be undone."
              message="Are you sure you want to permanently delete your account? All your reviews, history, and personal data will be permanently removed."
              confirmText="Delete Account"
              icon="delete"
            />
          </div>

          {editModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
              <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#161B22] p-6 shadow-2xl">
                <h2 className="mb-6 text-2xl font-bold text-white"> Update Profile </h2>
                <div className="space-y-5">
                  <div className="flex flex-col items-center">
                    <div className="mb-4 h-28 w-28 overflow-hidden rounded-full border-4 border-violet-500">
                      <img
                        src={
                          formData.avatarPreview ||
                          displayUser?.avatar?.url ||
                          "/default-avatar.png"
                        }
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <label
                      htmlFor="avatar"
                      className="cursor-pointer rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
                    >
                      Choose Image
                    </label>

                    <input
                      id="avatar"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />

                    <p className="mt-2 text-xs text-gray-400">
                      JPG, JPEG or PNG • Maximum file size: 5 MB
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Name
                    </label>

                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-gray-700 bg-[#0D1117] px-4 py-3 text-white outline-none focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Email
                    </label>

                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-gray-700 bg-[#0D1117] px-4 py-3 text-white outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setEditModalOpen(false)} > Cancel </Button>
                  <Button variant="primary" onClick={handleUpdateProfile} > Save Changes </Button>
                </div>
              </div>
            </div>
          )}


          <Card hover={false}>
            <h3 className="mb-2 text-sm font-medium text-text-muted">Name</h3>
            <p className="text-lg font-semibold text-white">{displayUser?.name}</p>
          </Card>

          <Card hover={false}>
            <h3 className="mb-2 text-sm font-medium text-text-muted">Email</h3>
            <p className="text-lg font-semibold text-white">{displayUser?.email}</p>
          </Card>

          <Card hover={false}>
            <h3 className="mb-2 text-sm font-medium text-text-muted">Reviews Count</h3>
            <p className="text-3xl font-bold gradient-text">{stats.normalReviews ?? 0}</p>
          </Card>

          <Card hover={false}>
            <h3 className="mb-2 text-sm font-medium text-text-muted">Saved Reviews</h3>
            <p className="text-3xl font-bold text-white">{favorites.length}</p>
          </Card>
        </div>

        <Card hover={false} className="mt-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Favorite Reviews</h2>
            <Button variant="ghost" size="sm" onClick={refreshUser}>
              Refresh
            </Button>
          </div>

          {favorites.length === 0 ? (
            <p className="text-sm text-text-muted">No saved reviews yet.</p>
          ) : (
            <div className="space-y-3">
              {favorites.map((favorite) => {
                const review = favorite.reviewId || favorite;
                const reviewId = favorite.reviewId._id;
                const favoriteId = favorite._id || favorite.id;

                return (
                  <div
                    key={favoriteId}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4"
                  >
                    <div>
                      <Link
                        to={`/reviews/${reviewId}`}
                        className="font-medium text-white hover:text-violet-300"
                      >
                        {review.title || 'Untitled Review'}
                      </Link>
                      {review.language && (
                        <p className="text-sm capitalize text-text-muted">{review.language}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFavorite(favoriteId)}
                    >
                      Remove
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </main>
    </PageTransition>
  );
}
