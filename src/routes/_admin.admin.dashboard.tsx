
import { useEffect, useState } from "react";
import AdminPagination from "@/components/admin/admin-pagination";
import { dashboardApi, type DashboardStats } from "@/lib/adminApi";

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [page, setPage] = useState(1);
  useEffect(() => { dashboardApi.getStats().then(setStats).catch(() => setStats(null)); }, []);

  const PER_PAGE = 5;
  const activities = stats?.activities ?? [];
  const totalPages = Math.max(1, Math.ceil(activities.length / PER_PAGE));
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);
  const pagedActivities = activities.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const cards = stats ? [
    {
      label: "Tổng Users", value: stats.totalUsers.toLocaleString(), trend: stats.usersTrend,
      bg: "bg-indigo-50", color: "text-indigo-500",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-1a4 4 0 00-4-4M9 20H4v-1a4 4 0 014-4h2m4-7a3 3 0 11-6 0 3 3 0 016 0zm5 1a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />,
    },
    {
      label: "Tổng Tài liệu", value: stats.totalDocs.toLocaleString(), trend: stats.docsTrend,
      bg: "bg-violet-50", color: "text-violet-500",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h6l4 4v12a2 2 0 01-2 2z" />,
    },
    {
      label: "Download", value: stats.downloads.toLocaleString(), trend: stats.downloadsTrend,
      bg: "bg-orange-50", color: "text-orange-500",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />,
    },
  ] : [];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {cards.map((c, i) => (
          <div key={i} className="bg-white p-5 rounded-[14px] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-11 h-11 rounded-[12px] ${c.bg} flex items-center justify-center shrink-0`}>
              <svg viewBox="0 0 24 24" fill="none" className={`w-5 h-5 ${c.color}`} stroke="currentColor" strokeWidth={2}>{c.icon}</svg>
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-gray-500 font-medium">{c.label}</p>
              <h3 className="text-[24px] font-bold mt-0.5">{c.value}</h3>
            </div>
            <span className="text-[11px] font-semibold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full self-start">{c.trend}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm p-6">
        <h2 className="text-[20px] font-bold mb-4">Hoạt động gần đây</h2>
        <div>
          {pagedActivities.map((a) => (
            <div key={a.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-[14px] font-semibold text-gray-800">{a.action}</p>
                <p className="text-[12px] text-gray-400 mt-0.5">{a.user}</p>
              </div>
              <span className="text-[12px] text-gray-400">{a.time}</span>
            </div>
          ))}
        </div>
        <AdminPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </>
  );
}
