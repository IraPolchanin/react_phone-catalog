// src/modules/ProductPage/components/ProductList/ProductList.tsx
import React from 'react';

import { ProductCard } from '@/modules/shared/components/ProductCard';
import { Product } from '@/types';

import styles from './ProductList.module.scss';

interface Props {
  products: Product[];
}

export const ProductList: React.FC<Props> = ({ products }) => {
  if (!products.length) {
    return <p>There are no products yet.</p>;
  }

  return (
    <div className={styles.productList}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
