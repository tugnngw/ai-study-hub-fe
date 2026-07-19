import React from 'react';

interface AdminPaginationProps { currentPage: number; totalPages: number; onPageChange?: (page: number) => void; }

// Tạo danh sách trang hiển thị, chèn '...' khi có quá nhiều trang
function buildPageList(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '...')[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) pages.push('...');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('...');
  pages.push(total);
  return pages;
}

const AdminPagination: React.FC<AdminPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Chỉ có 1 trang (hoặc rỗng) thì không cần hiện thanh phân trang
  if (totalPages <= 1) return null;

  const pages = buildPageList(currentPage, totalPages);

  return (
    <div className="flex justify-center items-center gap-2 mt-2 px-6 py-5 border-t border-gray-100 select-none">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        aria-label="Trang trước"
        className={`w-7 h-7 flex items-center justify-center rounded-full text-sm ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 cursor-pointer'}`}
      >‹</button>

      {pages.map((p, idx) =>
        p === '...' ? (
          <span key={`dots-${idx}`} className="w-7 h-7 flex items-center justify-center text-sm text-gray-400">…</span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange?.(p)}
            aria-current={p === currentPage ? 'page' : undefined}
            className={`w-7 h-7 rounded-full text-sm font-semibold flex items-center justify-center ${p === currentPage ? 'bg-[#7C5CFC] text-white' : 'text-gray-500 hover:bg-gray-100 cursor-pointer'}`}
          >{p}</button>
        )
      )}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        aria-label="Trang sau"
        className={`w-7 h-7 flex items-center justify-center rounded-full text-sm ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 cursor-pointer'}`}
      >›</button>
    </div>
  );
};

export default AdminPagination;
