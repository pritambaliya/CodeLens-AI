import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import CodeEditor from '../components/CodeEditor';
import PageTransition from '../components/PageTransition';
import { createReview, reviewAgain } from '../services/reviewService';
import { SUPPORTED_EXTENSIONS, SUPPORTED_LANGUAGES, MONACO_LANGUAGE_MAP, LANG } from '../utils/constants';

export default function CreateReviewPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('editor');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { isReReview, reviewId, review } = location.state || {};
  const [form, setForm] = useState({
    title: "",
    language: "javascript",
    code: "",
  });

  useEffect(() => {
    if (isReReview && review) {
      setForm({
        title: review.title || "",
        language: review.language || "javascript",
        code: review.code || "",
      });
    } else {
      setForm({
        title: "",
        language: "javascript",
        code: "",
      });
      setFile(null);
      setMode("editor");
    }
  }, [location.key]);

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const ext = '.' + selected.name.split('.').pop().toLowerCase();
    if (!SUPPORTED_EXTENSIONS.includes(ext)) {
      toast.error(`Unsupported file type. Supported: ${SUPPORTED_EXTENSIONS.join(', ')}`);
      e.target.value = '';
      return;
    }

    const langMap = LANG;

    setFile(selected);
    setForm((prev) => ({ ...prev, language: langMap[ext] || prev.language }));

    const reader = new FileReader();
    reader.onload = (event) => {
      setForm((prev) => ({ ...prev, code: event.target.result }));
    };
    reader.readAsText(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (mode === "editor" && !form.code.trim()) {
      toast.error("Please enter code");
      return;
    }

    if (mode === "upload" && !file) {
      toast.error("Please upload a file");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("language", form.language);
      formData.append("code", form.code);

      if (file) {
        formData.append("file", file);
      }

      let data;

      if (isReReview && reviewId) {
        data = await reviewAgain(reviewId, formData);
        toast.success("Review updated successfully!");

      } else {
        data = await createReview(formData);
        toast.success("Review submitted successfully!");
      }

      const id =
        data._id ||
        data.id ||
        data.review?._id ||
        data.review?.id ||
        reviewId;

      navigate(`/reviews/${id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to submit review"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar variant="dashboard" />

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            {isReReview ? "Re-Review Code" : "Create Code Review"}
          </h1>
          <p className="mt-1 text-text-muted">
            {isReReview
              ? "Update your existing review with new code."
              : "Submit your code for AI-powered analysis"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-text-muted">
              Review Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={form.title}
              onChange={!isReReview ? handleChange : undefined}
              readOnly={isReReview}
              className={`w-full rounded-xl border border-white/10 px-4 py-3 text-white outline-none transition-colors ${isReReview
                ? "cursor-not-allowed bg-white/10 opacity-70"
                : "bg-white/5 focus:border-violet-500/50"
                }`}
              placeholder="e.g. Authentication Module Review"
            />
          </div>

          <div className="glass-card rounded-2xl p-6">
            <label htmlFor="language" className="mb-2 block text-sm font-medium text-text-muted">
              Language
            </label>
            <select
              id="language"
              name="language"
              value={form.language}
              onChange={!isReReview ? handleChange : undefined}
              disabled={isReReview}
              className={`w-full rounded-xl border border-white/10 px-4 py-3 text-white outline-none transition-colors ${isReReview
                ? "cursor-not-allowed bg-white/10 opacity-70"
                : "bg-white/5 focus:border-violet-500/50"
                }`}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value} className="bg-background">
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="mb-4 flex gap-2">
              <button
                type="button"
                onClick={() => setMode('editor')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === 'editor'
                  ? 'bg-violet-600 text-white'
                  : 'text-text-muted hover:bg-white/5 hover:text-white'
                  }`}
              >
                Write Code
              </button>
              <button
                type="button"
                onClick={() => setMode('upload')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === 'upload'
                  ? 'bg-violet-600 text-white'
                  : 'text-text-muted hover:bg-white/5 hover:text-white'
                  }`}
              >
                Upload File
              </button>
            </div>

            {mode === 'upload' && (
              <div className="mb-4">
                <label
                  htmlFor="file"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-white/5 px-6 py-10 transition-colors hover:border-violet-500/30 hover:bg-white/10"
                >
                  <svg className="mb-3 h-10 w-10 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="text-sm font-medium text-white">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </span>
                  <span className="mt-1 text-xs text-text-muted">
                    Supported: {SUPPORTED_EXTENSIONS.join(', ')}
                  </span>
                  <input
                    id="file"
                    type="file"
                    accept={SUPPORTED_EXTENSIONS.join(',')}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            <CodeEditor
              value={form.code}
              onChange={(value) => setForm((prev) => ({ ...prev, code: value || '' }))}
              language={MONACO_LANGUAGE_MAP[form.language] || 'javascript'}
              height="350px"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" loading={loading} disabled={loading}>
              {isReReview ? "Re-review" : "Submit for Review"}
            </Button>
            <Button variant="secondary" type="button" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
          </div>
        </form>
      </main>
    </PageTransition>
  );
}
