function ProductCard({ product }) {
  return (
    <article className="catalog__card product-card">
      <div className="product-card__image-wrap">
        <img className="product-card__image" src={product.thumbnail} alt={product.title} loading="lazy" />
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__price">${product.price}</p>
      </div>
    </article>
  );
}

export default ProductCard;