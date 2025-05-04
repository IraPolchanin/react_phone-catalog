import React from 'react';

import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';

import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  maxVisiblePages?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const visiblePages = Math.min(maxVisiblePages, totalPages);

    if (totalPages <= maxVisiblePages) {
      // Якщо загальна кількість сторінок менша або дорівнює максимальній видимій, показуємо всі
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
      // Якщо ми ближче до початку
      for (let i = 1; i <= visiblePages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
      // Якщо ми ближче до кінця
      for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Ми десь посередині
      const offset = Math.floor(maxVisiblePages / 2);

      for (let i = currentPage - offset; i <= currentPage + offset; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <Icon
        as="button"
        icon="arrow_left"
        variant="slider-control"
        className={styles.pageIcon}
        ariaLabel="Previous page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {getPageNumbers().map(pageNum => (
        <Button
          key={pageNum}
          variant="pagination"
          active={pageNum === currentPage}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </Button>
      ))}

      <Icon
        as="button"
        icon="arrow_right"
        variant="slider-control"
        className={styles.pageIcon}
        ariaLabel="Next page"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};
