import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div className="product-card">
    <img src={product.imageUrl} alt={product.title} className="product-image" />
    <div className="product-details">
      <h3 className="product-title">{product.title}</h3>
      <p className="product-description">{product.description}</p>
      <div className="product-info">
        <span className="product-price">${product.price}</span>
        <span className={`product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
    </div>
  </div>
);
};

export default ProductCard
