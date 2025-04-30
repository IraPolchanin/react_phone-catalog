import { ProductInList } from '../types/Product';

export const getProducts = async (
  category?: string,
): Promise<ProductInList[]> => {
  let allData: ProductInList[] = [];

  if (category) {
    const endpoint = `/api/${category}.json`;
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
      const endpoint = `/api/${cat}.json`;
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

  return allData;
};

export const getProductById = async (
  productId: string,
): Promise<ProductInList | null> => {
  const categoriesToFetch = ['phones', 'tablets', 'accessories'];

  for (const category of categoriesToFetch) {
    const products = await getProducts(category);
    const product = products.find(p => String(p.id) === productId);

    if (product) {
      return product;
    }
  }

  return null;
};

export const getSuggestedProducts = async (): Promise<ProductInList[]> => {
  const products = await getProducts();

  // Перемішуємо масив для рандомного вибору
  return products.sort(() => Math.random() - 0.5);
};
