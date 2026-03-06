import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const cardStyles: React.CSSProperties = {
    backgroundColor: '#ffffff',
    border: `2px solid #BB0000`,
    borderRadius: '8px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const cardHoverStyles: React.CSSProperties = {
    ...cardStyles,
    boxShadow: '0 4px 12px rgba(187, 0, 0, 0.2)',
    transform: 'translateY(-4px)',
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const titleStyles: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#BB0000',
    margin: '0 0 8px 0',
  };

  const priceStyles: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#BB0000',
    margin: '8px 0',
  };

  const categoryStyles: React.CSSProperties = {
    fontSize: '12px',
    color: '#666666',
    backgroundColor: '#f0f0f0',
    padding: '4px 8px',
    borderRadius: '4px',
    display: 'inline-block',
    margin: '8px 0',
  };

  const sellerStyles: React.CSSProperties = {
    fontSize: '14px',
    color: '#666666',
    margin: '8px 0 0 0',
  };

  return (
    <div
      style={isHovered ? cardHoverStyles : cardStyles}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={titleStyles}>{product.title}</h3>
      <p style={priceStyles}>{formatPrice(product.price)}</p>
      <span style={categoryStyles}>{product.category}</span>
      <p style={sellerStyles}>Seller: {product.sellerName}</p>
    </div>
  );
}
