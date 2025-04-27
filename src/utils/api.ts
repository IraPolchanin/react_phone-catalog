export const getProducts = async (category?: string) => {
  const endpoint = category ? `/api/${category}.json` : '/api/products.json';
  const response = await fetch(endpoint);

  return response.json();
};
