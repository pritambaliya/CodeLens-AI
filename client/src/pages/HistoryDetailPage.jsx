import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
import CodeEditor from "../components/CodeEditor";
import Button from "../components/Button";

import { getHistoryById } from "../services/historyService";
import { MONACO_LANGUAGE_MAP } from "../utils/constants";

export default function HistoryDetailPage() {
  const { historyId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, [historyId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const data = await getHistoryById(historyId);

      setHistory(data);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load history."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageTransition className="min-h-screen bg-background">
        <Navbar variant="dashboard" />
        <div className="pt-32 text-center text-white">
          Loading...
        </div>
      </PageTransition>
    );
  }

  if (!history) {
    return (
      <PageTransition className="min-h-screen bg-background">
        <Navbar variant="dashboard" />
        <div className="pt-32 text-center text-red-400">
          History not found.
        </div>
      </PageTransition>
    );
  }

  const ai = history.aiResponse || {};

  return (
    <PageTransition className="min-h-screen bg-background">
      <Navbar variant="dashboard" />

      <main className="mx-auto max-w-7xl px-6 pt-24 pb-10">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-white">
              Version {history.version}
            </h1>

            <p className="mt-2 text-text-muted">
              {new Date(history.createdAt).toLocaleString()}
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={() =>
              navigate(`/reviews/${history.reviewId}`)
            }
          >
            Latest Review
          </Button>

        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="glass-card rounded-2xl p-6">

            <h2 className="mb-4 text-xl font-semibold text-white">
              Code Snapshot
            </h2>

            <CodeEditor
              value={history.codeSnapshot}
              readOnly
              language={
                MONACO_LANGUAGE_MAP[history.language] ||
                history.language ||
                "javascript"
              }
              height="600px"
            />

          </div>

          {/* AI */}

          <div className="space-y-6">

            <div className="glass-card rounded-2xl p-6">

              <h2 className="text-xl font-semibold text-white">
                AI Analysis
              </h2>

              <div className="mt-5">

                <p className="text-sm text-text-muted">
                  Score
                </p>

                <h3 className="mt-1 text-4xl font-bold text-violet-400">
                  {history.score ?? "-"} / 5
                </h3>

              </div>

              <div className="mt-6">

                <p className="mb-2 text-sm text-text-muted">
                  Summary
                </p>

                <p className="leading-7 text-white">
                  {history.aiResponse.optimization || "No summary available."}
                </p>

              </div>

            </div>

            <div className="glass-card rounded-2xl p-6">

              <h2 className="mb-5 text-xl font-semibold text-white">
                Issues
              </h2>

              {!ai.issues?.length ? (
                <p className="text-text-muted">
                  No issues found.
                </p>
              ) : (
                <div className="space-y-4">

                  {history.aiResponse.issues.map((issue, index) => (

                    <div
                      key={index}
                      className="rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center justify-between">

                        <span className="rounded bg-red-500/20 px-3 py-1 text-sm text-red-300">
                          {issue.type}
                        </span>

                        <span className="text-sm text-yellow-300">
                          {issue.severity}
                        </span>

                      </div>

                      <p className="mt-3 text-white">
                        {issue.description}
                      </p>

                      {issue.lineNumber && (
                        <p className="mt-2 text-sm text-text-muted">
                          Line : {issue.lineNumber}
                        </p>
                      )}

                      {issue.suggestion && (
                        <>
                          <p className="mt-4 text-sm font-semibold text-violet-300">
                            Suggestion
                          </p>

                          <p className="mt-1 text-text-muted">
                            {issue.suggestion}
                          </p>
                        </>
                      )}
                    </div>

                  ))}

                </div>
              )}

            </div>

          </div>

        </div>

      </main>
    </PageTransition>
  );
}