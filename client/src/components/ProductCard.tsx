import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types/Product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart, state } = useCart();
  const [isHovered, setIsHovered] = React.useState(false);
  const [adding, setAdding] = React.useState(false);

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdding(true);
    await addToCart(product.id);
    setAdding(false);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

  const cardStyles: React.CSSProperties = {
    backgroundColor: '#ffffff',
    border: `2px solid #BB0000`,
    borderRadius: '8px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  };

  const cardHoverStyles: React.CSSProperties = {
    ...cardStyles,
    boxShadow: '0 4px 12px rgba(187, 0, 0, 0.2)',
    transform: 'translateY(-4px)',
  };

  return (
    <div
      style={isHovered ? cardHoverStyles : cardStyles}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#BB0000', margin: '0 0 8px 0' }}>
        {product.title}
      </h3>
      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#BB0000', margin: '8px 0' }}>
        {formatPrice(product.price)}
      </p>
      <span
        style={{
          fontSize: '12px',
          color: '#666666',
          backgroundColor: '#f0f0f0',
          padding: '4px 8px',
          borderRadius: '4px',
          display: 'inline-block',
          margin: '8px 0',
        }}
      >
        {product.category}
      </span>
      <p style={{ fontSize: '14px', color: '#666666', margin: '8px 0 0 0', flex: 1 }}>
        Seller: {product.sellerName}
      </p>

      {state.error && (
        <p style={{ color: '#BB0000', fontSize: '12px', margin: '6px 0 0 0' }}>{state.error}</p>
      )}

      <button
        onClick={handleAddToCart}
        disabled={adding}
        style={{
          marginTop: '12px',
          backgroundColor: adding ? '#888' : '#BB0000',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 0',
          fontSize: '14px',
          cursor: adding ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
        }}
      >
        {adding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}
