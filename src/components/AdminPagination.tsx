import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

// Builds a compact page list with ellipsis, e.g. 1 … 4 5 6 … 12
function getPageList(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, 2, total - 1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result: (number | 'ellipsis')[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push('ellipsis');
    result.push(p);
  });
  return result;
}

const AdminPagination: React.FC<AdminPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pages = getPageList(currentPage, totalPages);

  return (
    <div className="flex justify-center pt-5 select-none">
      <div className="inline-flex items-center gap-1 bg-surface-alt rounded-xl p-1">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          aria-label="Trang trước"
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-snappy active:scale-90 ${
            currentPage === 1 ? 'text-ink-faint cursor-not-allowed' : 'text-ink-soft cursor-pointer hover:bg-card hover:shadow-xs'
          }`}
        >
          <ChevronLeft size={16} strokeWidth={2.5} />
        </button>

        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <span key={`e-${i}`} className="w-8 h-8 flex items-center justify-center text-ink-faint text-[13px] font-bold">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange?.(p)}
              aria-current={p === currentPage}
              className={`w-8 h-8 rounded-lg font-bold text-[13px] flex items-center justify-center transition-snappy active:scale-90 cursor-pointer ${
                p === currentPage ? 'bg-brand-500 text-white shadow-brand-glow' : 'text-ink-soft hover:bg-card hover:shadow-xs'
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          aria-label="Trang sau"
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-snappy active:scale-90 ${
            currentPage === totalPages ? 'text-ink-faint cursor-not-allowed' : 'text-ink-soft cursor-pointer hover:bg-card hover:shadow-xs'
          }`}
        >
          <ChevronRight size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default AdminPagination;
