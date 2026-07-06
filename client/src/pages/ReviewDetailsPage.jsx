import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Bug, Lightbulb, Gauge, FileCode2, Download, ArrowLeft, Heart, Clock, HardDrive, Sparkles, CircleCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Loader from '../components/Loader';
import CodeEditor from '../components/CodeEditor';
import PageTransition from '../components/PageTransition';
import { getReviewById } from '../services/reviewService';
import { addFavorite, removeFavorite, getFavorites } from '../services/favoriteService';
import { MONACO_LANGUAGE_MAP } from '../utils/constants';

function Badge({ children, tone = 'neutral' }) {
  const tones = {
    neutral: 'bg-white/10 text-white',
    red: 'bg-red-500/15 text-red-400',
    emerald: 'bg-emerald-500/15 text-emerald-400',
    amber: 'bg-amber-500/15 text-amber-400',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

function AnalysisSection({ title, icon, items, emptyMessage, accent }) {
  const accents = {
    red: 'border-l-red-400',
    emerald: 'border-l-emerald-400',
    amber: 'border-l-amber-400',
  };
  const iconTones = {
    red: 'bg-red-500/15 text-red-400',
    emerald: 'bg-emerald-500/15 text-emerald-400',
    amber: 'bg-amber-500/15 text-amber-400',
  };
  const hasItems = items && items.length > 0;

  return (
    <Card hover={false} className={`border-l-2 ${accents[accent]}`}>
      <div className="mb-4 flex items-center gap-3">
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconTones[accent]}`}>
          {icon}
        </span>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {hasItems && <Badge tone={accent}>{items.length}</Badge>}
      </div>

      {!hasItems ? (
        <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-4 text-sm text-text-muted">
          <CircleCheck className="h-4 w-4 flex-shrink-0" />
          <span>{emptyMessage}</span>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <AnalysisListItem key={index} item={item} accent={accent} />
          ))}
        </ul>
      )}
    </Card>
  );
}

function AnalysisListItem({ item, accent }) {
  const isPlainText = typeof item === 'string';
  const titleTone = { red: 'text-red-400', emerald: 'text-emerald-400', amber: 'text-amber-400' }[accent];

  return (
    <li className="rounded-xl border border-white/5 bg-white/5 p-4 text-sm leading-relaxed text-text-muted">
      {isPlainText ? (
        <span className={titleTone}>{item}</span>
      ) : (
        <>
          {item.title && <p className={`font-medium ${titleTone}`}>{item.title}</p>}
          <p className="mt-1">{item.description || item.message || item.text || JSON.stringify(item)}</p>
          {item.severity && (
            <div className="mt-2">
              <Badge tone="red">{item.severity}</Badge>
            </div>
          )}
        </>
      )}
    </li>
  );
}

function RatingGauge({ score, reason }) {
  const numericScore = Number(score) || 0;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, numericScore / 5));
  const dashOffset = circumference * (1 - progress);
  const ringColor = numericScore >= 4 ? '#34D399' : numericScore >= 2.5 ? '#FBBF24' : '#F87171';

  return (
    <Card hover={false}>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Gauge className="h-5 w-5" />
        </span>
        <h2 className="text-lg font-semibold text-white">Overall Rating</h2>
      </div>

      <div className="flex items-center gap-6">
        <svg width="100" height="100" viewBox="0 0 100 100" className="flex-shrink-0 -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
          <text
            x="50"
            y="55"
            textAnchor="middle"
            transform="rotate(90 50 50)"
            className="fill-white text-2xl font-bold"
          >
            {score ?? '-'}
          </text>
        </svg>

        <p className="text-sm leading-relaxed text-text-muted">{reason}</p>
      </div>
    </Card>
  );
}

function FileInfoCard({ file, language }) {
  return (
    <Card hover={false}>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white">
          <FileCode2 className="h-5 w-5" />
        </span>
        <h2 className="text-lg font-semibold text-white">File Information</h2>
      </div>

      <dl className="space-y-3 text-sm">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <dt className="text-text-muted">Name</dt>
          <dd className="font-medium text-white">{file?.name || '—'}</dd>
        </div>
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <dt className="text-text-muted">Language</dt>
          <dd>
            <Badge>{language}</Badge>
          </dd>
        </div>
        <div className="flex items-center justify-between pb-2">
          <dt className="flex items-center gap-1.5 text-text-muted">
            <HardDrive className="h-3.5 w-3.5" /> Size
          </dt>
          <dd className="font-medium text-white">{file?.size ? `${file.size} bytes` : '—'}</dd>
        </div>
      </dl>

      {file?.url ? (
        <a
          href={file.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-primary underline underline-offset-2"
        >
          <Download className="h-4 w-4" /> Download Original File
        </a>
      ) : (
        <p className="mt-4 text-sm text-text-muted">No original file available.</p>
      )}
    </Card>
  );
}


function isBugIssue(issue) {
  const severity = issue.severity?.toLowerCase();
  return issue.type?.toLowerCase() === 'bug' || severity === 'high' || severity === 'critical';
}

function deriveBugsAndImprovements(review, ai) {
  const issues = ai.issues || [];
  const bugs = issues.filter(isBugIssue);

  const improvements = [
    review.optimization && { title: 'Optimization', description: review.optimization },
    review.betterApproach && { title: 'Better Approach', description: review.betterApproach },
    ...issues.filter((issue) => !isBugIssue(issue)),
  ].filter(Boolean);

  return { bugs, improvements };
}

function deriveComplexity(ai) {
  const complexity = [];

  if (ai.timeComplexity) {
    complexity.push({
      title: 'Time Complexity',
      description: `${ai.timeComplexity.bigO} - ${ai.timeComplexity.reason}`,
    });
  }

  if (ai.spaceComplexity) {
    complexity.push({
      title: 'Space Complexity',
      description: `${ai.spaceComplexity.bigO} - ${ai.spaceComplexity.reason}`,
    });
  }

  return complexity;
}

function useReview(id) {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await getReviewById(id);
        if (isMounted) setReview(data.review || data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load review');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { review, loading };
}

function useFavoriteStatus(reviewId) {
  const [favoriteId, setFavoriteId] = useState(null);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getFavorites();
        const favorites = Array.isArray(data) ? data : data.favorites || [];
        const match = favorites.find(
          (fav) => (fav.reviewId || fav.review?._id || fav.review?.id) === reviewId
        );
        if (match) setFavoriteId(match._id || match.id);
      } catch {
      }
    })();
  }, [reviewId]);

  const toggleFavorite = async () => {
    setIsToggling(true);
    try {
      if (favoriteId) {
        await removeFavorite(favoriteId);
        setFavoriteId(null);
        toast.success('Removed from favorites');
      } else {
        const data = await addFavorite(reviewId);
        const newId = data._id || data.id || data.favorite?._id || data.favorite?.id;
        setFavoriteId(newId);
        toast.success('Added to favorites');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update favorite');
    } finally {
      setIsToggling(false);
    }
  };

  return { favoriteId, isToggling, toggleFavorite };
}

export default function ReviewDetailsPage() {
  const { id } = useParams();
  const { review, loading } = useReview(id);
  const { favoriteId, isToggling, toggleFavorite } = useFavoriteStatus(id);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader size="lg" text="Loading review..." />
      </div>
    );
  }

  if (!review) {
    return (
      <PageTransition className="min-h-screen bg-background">
        <Navbar variant="dashboard" />
        <main className="mx-auto max-w-4xl px-4 py-32 text-center">
          <h1 className="text-2xl font-bold text-white">Review not found</h1>
          <Button className="mt-4" to="/dashboard">
            Back to Dashboard
          </Button>
        </main>
      </PageTransition>
    );
  }

  const ai = review.aiResponse || {};
  const { bugs, improvements } = deriveBugsAndImprovements(review, ai);
  const complexity = deriveComplexity(ai);
  const summary = review.rating?.reason || ai.rating?.reason || '';
  const rating = {
    score: review.rating?.score ?? ai.rating?.score,
    reason: review.rating?.reason ?? ai.rating?.reason,
  };
  const fileName = review.file?.name || `${review.title || 'review'}.${review.language || 'txt'}`;

  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar variant="dashboard" />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-white">{review.title}</h1>
              <Badge>{review.language}</Badge>
            </div>
            {review.createdAt && (
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-text-muted">
                <Clock className="h-3.5 w-3.5" />
                {new Date(review.createdAt).toLocaleString('en-GB')}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant={favoriteId ? 'outline' : 'secondary'}
              size="sm"
              onClick={toggleFavorite}
              loading={isToggling}
              disabled={isToggling}
            >
              <Heart className={`mr-1.5 h-4 w-4 ${favoriteId ? 'fill-current' : ''}`} />
              {favoriteId ? 'Saved' : 'Save Review'}
            </Button>
            <Button variant="ghost" size="sm" to="/dashboard">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <Card hover={false} className="overflow-hidden p-0">
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-2 text-xs text-text-muted">{fileName}</span>
              </div>
              <div className="p-4">
                <CodeEditor
                  value={review.code || ''}
                  language={MONACO_LANGUAGE_MAP[review.language] || 'javascript'}
                  height="300px"
                  readOnly
                />
              </div>
            </Card>
          </div>

          {summary && (
            <div className="lg:col-span-2">
              <Card hover={false} glow className="border-l-2 border-l-primary">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <h2 className="text-lg font-semibold text-white">AI Analysis</h2>
                </div>
                <p className="text-sm leading-relaxed text-text-muted">{summary}</p>
              </Card>
            </div>
          )}

          <AnalysisSection
            title="Bugs Detected"
            icon={<Bug className="h-5 w-5" />}
            items={bugs}
            emptyMessage="No bugs detected in this review."
            accent="red"
          />

          <AnalysisSection
            title="Improvements"
            icon={<Lightbulb className="h-5 w-5" />}
            items={improvements}
            emptyMessage="No improvement suggestions available."
            accent="emerald"
          />

          <div className="lg:col-span-2">
            <AnalysisSection
              title="Complexity Suggestions"
              icon={<Clock className="h-5 w-5" />}
              items={complexity}
              emptyMessage="No complexity suggestions available."
              accent="amber"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <RatingGauge score={rating.score ?? '-'} reason={rating.reason} />
          <FileInfoCard file={review.file} language={review.language} />
        </div>
      </main>
    </PageTransition>
  );
}