import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Product, ProductInList } from '../types';

type ProductsContextType = {
  products: Product[];
  loading: boolean;
  error: string | null;
  featuredProducts: Product[];
  brandNewProducts: Product[];
  hotPricesProducts: Product[];
  categories: {
    name: string;
    slug: string;
    count: number;
    image: string;
  }[];
  fetchProducts: (category?: string) => void;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rawProducts, setRawProducts] = useState<(Product | ProductInList)[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isProductInList = (
    item: Product | ProductInList,
  ): item is ProductInList => {
    return 'id' in item && ('priceRegular' in item || 'fullPrice' in item);
  };

  const convertToProduct = (item: ProductInList): Product => {
    const price = item.priceDiscount || item.price || item.priceRegular || 0;
    const fullPrice = item.priceRegular || item.fullPrice || price;

    return {
      id: String(item.id), // Перетворюємо id на string
      category: item.category,
      name: item.name,
      price,
      fullPrice,
      color: item.color,
      screen: item.screen || 'N/A',
      capacity: item.capacity || 'N/A',
      ram: item.ram || 'N/A',
      year: item.year || 0,
      image: item.image || (item.images && item.images[0]) || '',
      ...(item.category === 'accessories'
        ? {}
        : {
            resolution: item.resolution || 'Unknown',
            processor: item.processor || 'Unknown',
            camera: item.camera || 'Unknown',
            zoom: item.zoom || 'N/A',
            cell: item.cell || [],
          }),
    } as Product;
  };

  const validProducts = rawProducts
    .filter(isProductInList)
    .map(convertToProduct);

  const getNewestByCategory = (category: string) => {
    return [...validProducts]
      .filter(p => p.category === category)
      .sort((a, b) => (b.year || 0) - (a.year || 0))
      .slice(0, 1);
  };

  const featuredProducts = [
    ...getNewestByCategory('phones'),
    ...getNewestByCategory('tablets'),
    ...getNewestByCategory('accessories'),
  ].filter(Boolean);

  const hotPricesProducts = [...validProducts]
    .filter(product => (product.fullPrice || 0) > (product.price || 0))
    .sort(
      (a, b) =>
        (b.fullPrice || 0) -
        (b.price || 0) -
        ((a.fullPrice || 0) - (a.price || 0)),
    );

  const brandNewProducts = [...validProducts].sort(
    (a, b) => (b.year || 0) - (a.year || 0),
  );

  const categories = [
    {
      name: 'Mobile phones',
      slug: 'phones',
      count: validProducts.filter(p => p.category === 'phones').length,
      image: '/img/category-phones.webp',
    },
    {
      name: 'Tablets',
      slug: 'tablets',
      count: validProducts.filter(p => p.category === 'tablets').length,
      image: '/img/category-tablets.webp',
    },
    {
      name: 'Accessories',
      slug: 'accessories',
      count: validProducts.filter(p => p.category === 'accessories').length,
      image: '/img/category-accessories.webp',
    },
  ];

  const fetchProducts = useCallback(async (category?: string) => {
    try {
      setLoading(true);
      let allData: ProductInList[] = [];

      if (category) {
        const endpoint = `api/${category}.json`;
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        allData = data.map((item: ProductInList) => ({
          ...item,
          category: item.category || category,
        }));
      } else {
        const categoriesToFetch = ['phones', 'tablets', 'accessories'];

        for (const cat of categoriesToFetch) {
          const endpoint = `api/${cat}.json`;
          const response = await fetch(endpoint);

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const data = await response.json();

          allData = [
            ...allData,
            ...data.map((item: ProductInList) => ({
              ...item,
              category: item.category || cat,
            })),
          ];
        }
      }

      setRawProducts(allData);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setRawProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductsContext.Provider
      value={{
        products: validProducts,
        loading,
        error,
        featuredProducts,
        brandNewProducts,
        hotPricesProducts,
        categories,
        fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    {
      throw new Error('useProducts must be used within a ProductsProvider');
    }
  }

  return context;
};
