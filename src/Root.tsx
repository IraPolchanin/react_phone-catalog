// src/Root.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { ProductPage } from './modules/ProductPage/ProductPage';
// import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage'; // не забудь правильний імпорт

export const Root: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />

      <Route path=":category" element={<ProductPage />} />

      {/* Product details page */}
      {/* <Route path="product/:productId" element={<ProductDetailsPage />} /> */}

      {/* Cart and favorites */}
      <Route path="favorites" element={<FavoritesPage />} />
      <Route path="cart" element={<CartPage />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
