import { useSearchParams, useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useProducts } from '@/contexts/ProductsContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/Button';
import { Pagination } from '@/components/Pagination';
import {
  sortProducts,
  paginateProducts,
  getCategoryTitle,
  SORT_OPTIONS,
} from '@/utils/sortUtils';
import { getSortOption } from '@/utils/urlParamsUtils';

import { ProductList } from './components/ProductList';
import styles from './ProductPage.module.scss';

const PER_PAGE_OPTIONS = [4, 8, 16, 'all'] as const;

export const ProductPage = () => {
  const { category } = useParams<{ category: string }>();
  const { products, loading, error, fetchProducts } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedProducts, setSortedProducts] = useState(products);

  const sort = getSortOption(searchParams.get('sort'));
  const page = +(searchParams.get('page') || 1);
  const perPage =
    searchParams.get('perPage') === 'all'
      ? Infinity
      : +(searchParams.get('perPage') || 8);

  useEffect(() => {
    const hasProducts = products.some(p => p.category === category);

    if (!hasProducts && !loading) {
      fetchProducts(category);
    }
  }, [category, fetchProducts, products, loading]);

  useEffect(() => {
    const sorted = sortProducts(products, sort, category);

    setSortedProducts(sorted);
  }, [products, category, sort]);

  if (!category || !['phones', 'tablets', 'accessories'].includes(category)) {
    return <Navigate to="/not-found" replace />;
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('sort', value);
    } else {
      newParams.delete('sort');
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const newParams = new URLSearchParams(searchParams);

    if (value === 'all') {
      newParams.set('perPage', 'all');
    } else {
      newParams.set('perPage', value);
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  const { currentProducts, totalPages } = paginateProducts(
    sortedProducts,
    page,
    perPage,
  );

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (newPage > 1) {
      newParams.set('page', String(newPage));
    } else {
      newParams.delete('page');
    }

    setSearchParams(newParams);
  };

  // Рендеринг випадаючого списку для сортування
  const renderSortSelect = () => (
    <div className={`${styles.controlGroup} ${styles.sortFilter}`}>
      <label htmlFor="sort" className={styles.controlLabel}>
        Sort by:
      </label>
      <select
        id="sort"
        value={sort}
        onChange={handleSortChange}
        className={styles.select}
      >
        <option value="">Select...</option>
        {Object.entries(SORT_OPTIONS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );

  // Рендеринг випадаючого списку для кількості елементів на сторінці
  const renderPerPageSelect = () => (
    <div className={`${styles.controlGroup} ${styles.perPageFilter}`}>
      <label htmlFor="perPage" className={styles.controlLabel}>
        Items on page:
      </label>
      <select
        id="perPage"
        value={perPage === Infinity ? 'all' : String(perPage)}
        onChange={handlePerPageChange}
        className={styles.select}
      >
        {PER_PAGE_OPTIONS.map(option => (
          <option key={option} value={option}>
            {option === 'all' ? 'All' : option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className={styles.productPage}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs />
      </div>

      <h1 className={styles.title}>{getCategoryTitle(category)}</h1>

      <p className={styles.productCount}>{sortedProducts.length} models</p>

      {loading && <div className={styles.loader}>Loading...</div>}

      {error && (
        <div className={styles.error}>
          <p>Something went wrong: {error}</p>
          <Button variant="default" onClick={() => fetchProducts(category)}>
            Reload
          </Button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className={styles.controls}>
            {renderSortSelect()}
            {renderPerPageSelect()}
          </div>

          {currentProducts.length > 0 ? (
            <>
              <div className={styles.productListWrapper}>
                <ProductList products={currentProducts} />
              </div>

              {perPage !== Infinity && totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  maxVisiblePages={5}
                />
              )}
            </>
          ) : (
            <p className={styles.noProducts}>There are no {category} yet.</p>
          )}
        </>
      )}
    </div>
  );
};
