import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const ProductContext = createContext(null);

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://dummyjson.com/products?limit=100');
      if (response.ok) {
        const data = await response.json();
        setProducts(Array.isArray(data.products) ? data.products : []);
      } else {
        setError('Не удалось загрузить товары. Попробуйте еще раз.');
      }
    } catch (fetchError) {
      setError('Не удалось загрузить товары. Попробуйте еще раз.');
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      fetchProducts,
    }),
    [products, loading, error, fetchProducts]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

function useProducts() {
  return useContext(ProductContext);
}

export { ProductContext, ProductProvider, useProducts };
