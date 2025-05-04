import { Product } from '@/types/Product';

export type SortOption = 'age' | 'price' | 'title';

export const SORT_OPTIONS: Record<SortOption, string> = {
  age: 'Newest',
  title: 'Alphabetically',
  price: 'Cheapest',
};

export const sortProducts = (
  products: Product[],
  sortBy: SortOption,
  category?: string,
): Product[] => {
  // Filter products by category if provided
  const filteredProducts = category
    ? products.filter(p => p.category === category)
    : [...products];

  return filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'age':
        return (b.year || 0) - (a.year || 0);
      case 'title':
        return (a.name || '').localeCompare(b.name || '');
      case 'price':
        return (a.price ?? Infinity) - (b.price ?? Infinity);
      default:
        return 0;
    }
  });
};

export const paginateProducts = (
  products: Product[],
  page: number,
  perPage: number,
) => {
  if (perPage === Infinity) {
    return { currentProducts: [...products], totalPages: 1 };
  }

  const totalPages = Math.ceil(products.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const currentProducts = products.slice(start, end);

  return { currentProducts, totalPages };
};

export const getCategoryTitle = (category: string): string => {
  const map: Record<string, string> = {
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  return map[category] || 'Products';
};
