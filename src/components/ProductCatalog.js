import { useMemo, useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';

function ProductCatalog() {
  const { products, loading, error, fetchProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const parsedPrice = maxPrice === '' ? Infinity : Number(maxPrice);
    const effectivePrice = Number.isNaN(parsedPrice) ? Infinity : parsedPrice;

    return products.filter((product) => {
      const matchesQuery = product.title.toLowerCase().includes(normalizedQuery);
      const matchesPrice = product.price <= effectivePrice;
      return matchesQuery && matchesPrice;
    });
  }, [products, searchQuery, maxPrice]);

  return (
    <main className="catalog">
      <section className="catalog__panel">
        <h1 className="catalog__title">Каталог товаров</h1>
        <p className="catalog__subtitle">Ищите по названию и фильтруйте по максимальной цене</p>

        <div className="catalog__filters">
          <label className="catalog__field" htmlFor="search-input">
            <span className="catalog__label">Поиск</span>
            <input
              id="search-input"
              className="catalog__input"
              type="text"
              placeholder="Введите название товара"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>

          <label className="catalog__field" htmlFor="price-input">
            <span className="catalog__label">Максимальная цена</span>
            <input
              id="price-input"
              className="catalog__input"
              type="number"
              min="0"
              placeholder="Например: 100"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            />
          </label>
        </div>
      </section>

      {loading && <p className="catalog__status">Загрузка товаров...</p>}

      {error && (
        <div className="catalog__error-box" role="alert">
          <p className="catalog__status">{error}</p>
          <button className="catalog__retry" type="button" onClick={fetchProducts}>
            Повторить
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="catalog__count">Найдено товаров: {filteredProducts.length}</p>
          <section className="catalog__grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <p className="catalog__status">Товары не найдены по выбранным фильтрам.</p>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default ProductCatalog;
