import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { ProductsProvider } from './contexts/ProductsContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { CartProvider } from './contexts/CartContext';
import { Root } from './Root';
import './styles/global.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ProductsProvider>
      <FavoritesProvider>
        <CartProvider>
          <Root />
        </CartProvider>
      </FavoritesProvider>
    </ProductsProvider>
  </HashRouter>,
);
