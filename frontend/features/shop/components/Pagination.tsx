import { Button } from '@/common/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '../types';

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="flex items-center justify-center space-x-4 mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => !isPrevDisabled && onPageChange(currentPage - 1)}
        disabled={isPrevDisabled}
        className={`${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100'}`}
      >
        <ChevronLeft className="mr-2" />
        Previous
      </Button>

      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => !isNextDisabled && onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
        className={`${isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100'}`}
      >
        Next
        <ChevronRight className="ml-2" />
      </Button>
    </div>
  );
};
