import { useSearchParams, useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useProducts } from '@/contexts/ProductsContext';
import { Breadcrumbs } from '@/components/Breadcrumbs'; // Додаємо імпорт

import { ProductList } from './components/ProductList';
import styles from './ProductPage.module.scss';

const SORT_OPTIONS = {
  age: 'Newest',
  title: 'Alphabetically',
  price: 'Cheapest',
};

const PER_PAGE_OPTIONS = [4, 8, 16, 'all'] as const;

export const ProductPage = () => {
  const { category } = useParams<{ category: string }>();
  const { products, loading, error, fetchProducts } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedProducts, setSortedProducts] = useState(products);

  const sort = searchParams.get('sort') || '';
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
    const sorted = [...products].filter(p => p.category === category);

    if (sort === 'age') {
      sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sort === 'title') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'price') {
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    }

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
      newParams.delete('perPage');
    } else {
      newParams.set('perPage', value);
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  const totalPages = Math.ceil(sortedProducts.length / perPage);
  const currentProducts = sortedProducts.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  const goToPage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (newPage > 1) {
      newParams.set('page', String(newPage));
    } else {
      newParams.delete('page');
    }

    setSearchParams(newParams);
  };

  const getCategoryTitle = () => {
    switch (category) {
      case 'phones':
        return 'Mobile Phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return '';
    }
  };

  return (
    <div className={styles.productPage}>
      {/* Використовуємо компонент Breadcrumbs замість статичної розмітки */}
      <Breadcrumbs />

      <h1 className={styles.title}>{getCategoryTitle()}</h1>

      {/* Product count */}
      <p className={styles.productCount}>{sortedProducts.length} models</p>

      {loading && <div className={styles.loader}>Loading...</div>}

      {error && (
        <div className={styles.error}>
          <p>Something went wrong: {error}</p>
          <button
            className={styles.reloadButton}
            onClick={() => fetchProducts(category)}
          >
            Reload
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <label htmlFor="sort">Sort by:</label>
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

            <div className={styles.controlGroup}>
              <label htmlFor="perPage">Items on page:</label>
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
          </div>

          {currentProducts.length > 0 ? (
            <>
              <ProductList products={currentProducts} />

              {perPage !== Infinity && totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    className={styles.pageButton}
                    disabled={page <= 1}
                    onClick={() => goToPage(page - 1)}
                  >
                    &lt;
                  </button>

                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;

                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        className={classNames(styles.pageButton, {
                          [styles.active]: pageNum === page,
                        })}
                        onClick={() => goToPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    className={styles.pageButton}
                    disabled={page >= totalPages}
                    onClick={() => goToPage(page + 1)}
                  >
                    &gt;
                  </button>
                </div>
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
