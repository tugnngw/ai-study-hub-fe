import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AdminPaginationProps { currentPage: number; totalPages: number; onPageChange?: (page: number) => void; }

const AdminPagination: React.FC<AdminPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 0) return null;
  return (
    <div className="flex justify-center items-center gap-1.5 pt-5 select-none">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className={`w-8 h-8 rounded-lg flex items-center justify-center border border-line transition-snappy active:scale-95 ${currentPage === 1 ? 'text-ink-faint cursor-not-allowed' : 'text-ink-soft cursor-pointer hover:bg-surface-alt'}`}
      >
        <ChevronLeft size={16} strokeWidth={2.5} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          type="button"
          onClick={() => onPageChange?.(i + 1)}
          className={`w-8 h-8 rounded-lg font-bold text-[13.5px] flex items-center justify-center transition-snappy active:scale-95 cursor-pointer ${
            i + 1 === currentPage ? 'bg-brand-500 text-white shadow-brand-glow' : 'border border-line text-ink-soft hover:bg-surface-alt'
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className={`w-8 h-8 rounded-lg flex items-center justify-center border border-line transition-snappy active:scale-95 ${currentPage === totalPages ? 'text-ink-faint cursor-not-allowed' : 'text-ink-soft cursor-pointer hover:bg-surface-alt'}`}
      >
        <ChevronRight size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default AdminPagination;
