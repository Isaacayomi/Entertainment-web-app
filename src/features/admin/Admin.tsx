import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  isAdmin,
  getAllAdminStats,
  getSignupsPage,
  type AdminStats,
  type SignupUser,
} from "../../services/apiAdmin";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import Spinner from "../../ui/Spinner";
import SEO from "../../ui/SEO";

type PageEntry = { first: QueryDocumentSnapshot; last: QueryDocumentSnapshot };

const PAGE_SIZES = [10, 20, 50, 100];
const DEFAULT_PAGE_SIZE = 20;

function Admin() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [anchors, setAnchors] = useState<(PageEntry | null)[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [signups, setSignups] = useState<SignupUser[]>([]);
  const [signupsLoading, setSignupsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    isAdmin()
      .then((result) => {
        setAuthorized(result);
        setChecking(false);
        if (!result) {
          setTimeout(() => navigate("/", { replace: true }), 3000);
        }
      })
      .catch(() => {
        setAuthorized(false);
        setChecking(false);
      });
  }, [navigate]);

  useEffect(() => {
    if (!authorized) return;
    setLoading(true);
    getAllAdminStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setStats(null);
        setLoading(false);
      });
  }, [authorized]);

  const loadPage = useCallback(
    async (size: number, targetPage: number, dir: "next" | "prev") => {
      setSignupsLoading(true);
      try {
        let result;
        let entry: PageEntry | null = null;
        if (targetPage === 1) {
          result = await getSignupsPage({ pageSize: size });
          entry = result.prev && result.next ? { first: result.prev, last: result.next } : null;
        } else if (dir === "prev") {
          const anchor = anchors[targetPage - 1];
          if (!anchor) return;
          result = await getSignupsPage({ pageSize: size, before: anchor.first });
          entry = anchor;
        } else {
          const anchor = anchors[targetPage - 2];
          if (!anchor) return;
          result = await getSignupsPage({ pageSize: size, after: anchor.last });
          entry = result.prev && result.next ? { first: result.prev, last: result.next } : null;
        }
        setSignups(result.users);
        setAnchors((prev) => {
          const next = [...prev];
          next[targetPage - 1] = entry;
          return next;
        });
        setCurrentPage(targetPage);
        setHasNext(result.users.length === size && !!result.next);
      } catch {
        setSignups([]);
        setHasNext(false);
      } finally {
        setSignupsLoading(false);
      }
    },
    [anchors],
  );

  const handleChangePageSize = (size: number) => {
    setPageSize(size);
    setAnchors([]);
    setCurrentPage(0);
    setSignups([]);
    setHasNext(false);
    loadPage(size, 1, "next");
  };

  const hasStats = stats !== null;

  useEffect(() => {
    if (!authorized || !hasStats) return;
    loadPage(pageSize, 1, "next");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized, hasStats]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-darkBlue">
        <Spinner />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-darkBlue text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <h1 className="text-xl font-semibold">Access Denied</h1>
        <p className="text-sm text-white/50">
          You do not have admin privileges.
        </p>
        <p className="text-xs text-white/30">Redirecting to home...</p>
      </div>
    );
  }

  if (loading || !stats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-darkBlue">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkBlue px-6 py-8 text-white md:px-12">
      <SEO
        title="Admin Dashboard"
        description="WòFlix admin dashboard and analytics."
      />
      <div className="mb-8 flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white/5 p-5">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Total Users
          </p>
          <p className="mt-1 text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="rounded-xl bg-white/5 p-5">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Total Watches
          </p>
          <p className="mt-1 text-3xl font-bold">{stats.totalWatches}</p>
        </div>
        <div className="rounded-xl bg-white/5 p-5">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Countries
          </p>
          <p className="mt-1 text-3xl font-bold">
            {stats.countryBreakdown.length}
          </p>
        </div>
        <div className="rounded-xl bg-white/5 p-5">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Avg Watches / User
          </p>
          <p className="mt-1 text-3xl font-bold">
            {stats.totalUsers > 0
              ? (stats.totalWatches / stats.totalUsers).toFixed(1)
              : "0"}
          </p>
        </div>
      </div>

      {/* Popular Content */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Most Watched Content</h2>
        <div className="overflow-x-auto rounded-xl bg-white/5">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase text-white/40">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Watches</th>
              </tr>
            </thead>
            <tbody>
              {stats.popularContent.map((item, i) => (
                <tr
                  key={item.title}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="px-4 py-3 text-white/40">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{item.title}</td>
                  <td className="px-4 py-3 capitalize text-white/60">
                    {item.category}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-red/20 px-2.5 py-0.5 text-xs font-medium text-red">
                      {item.count}
                    </span>
                  </td>
                </tr>
              ))}
              {stats.popularContent.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-white/30"
                  >
                    No watch data yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Country Breakdown */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">Users by Country</h2>
          <div className="overflow-x-auto rounded-xl bg-white/5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase text-white/40">
                  <th className="px-4 py-3 font-medium">Country</th>
                  <th className="px-4 py-3 font-medium">Users</th>
                  <th className="px-4 py-3 font-medium">%</th>
                </tr>
              </thead>
              <tbody>
                {stats.countryBreakdown.map((item) => (
                  <tr
                    key={item.country}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="px-4 py-3 font-medium">{item.country}</td>
                    <td className="px-4 py-3">{item.count}</td>
                    <td className="px-4 py-3 text-white/50">
                      {stats.totalUsers > 0
                        ? ((item.count / stats.totalUsers) * 100).toFixed(1)
                        : "0"}
                      %
                    </td>
                  </tr>
                ))}
                {stats.countryBreakdown.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-8 text-center text-white/30"
                    >
                      No user data yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent Signups */}
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Recent Signups</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40">Rows</span>
              <select
                value={pageSize}
                onChange={(e) => handleChangePageSize(Number(e.target.value))}
                className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:ring-2 focus:ring-white/30"
              >
                {PAGE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl bg-white/5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase text-white/40">
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Country</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {signupsLoading ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8">
                      <div className="flex items-center justify-center gap-2 text-white/40">
                        <Spinner />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {signups.map((user) => (
                      <tr
                        key={user.uid}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="max-w-[200px] truncate px-4 py-3 font-medium">
                          {user.email}
                        </td>
                        <td className="px-4 py-3 text-white/60">{user.country}</td>
                        <td className="px-4 py-3 text-xs text-white/50">
                          {user.createdAt}
                        </td>
                      </tr>
                    ))}
                    {signups.length === 0 && (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-4 py-8 text-center text-white/30"
                        >
                          No signups yet.
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-white/40">
              Page {currentPage}
              {signups.length > 0 && ` · ${signups.length} shown`}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => loadPage(pageSize, currentPage - 1, "prev")}
                disabled={signupsLoading || currentPage <= 1}
                className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-sm transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Prev
              </button>
              <button
                onClick={() => loadPage(pageSize, currentPage + 1, "next")}
                disabled={signupsLoading || !hasNext}
                className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-sm transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Admin;
