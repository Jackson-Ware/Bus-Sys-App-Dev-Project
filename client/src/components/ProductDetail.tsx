import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import { API_BASE } from '../api/http';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    await addToCart(product.id, quantity);
    setAdding(false);
    setAddedMessage(`Added ${quantity} item(s) to cart!`);
    setTimeout(() => setAddedMessage(null), 3000);
  };

  const formatCurrency = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  if (!product) {
    return <div style={{ padding: '20px' }}>Product not found</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          backgroundColor: '#BB0000',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Back
      </button>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.title}
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            marginBottom: '20px',
            borderRadius: '4px',
          }}
        />
      )}

      <h1>{product.title}</h1>

      <div style={{ marginBottom: '20px' }}>
        <p>
          <strong>Price:</strong> {formatCurrency(product.price)}
        </p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Seller:</strong> {product.sellerName}
        </p>
        <p>
          <strong>Posted:</strong> {formatDate(product.postedDate)}
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h2>Description</h2>
        <p>{product.description}</p>
      </div>

      <div
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '16px',
          backgroundColor: '#fafafa',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <label style={{ fontWeight: 'bold' }}>Quantity:</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              style={{
                width: '30px',
                height: '30px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                backgroundColor: quantity <= 1 ? '#f5f5f5' : 'white',
                fontSize: '16px',
              }}
            >
              −
            </button>
            <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 'bold' }}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              style={{
                width: '30px',
                height: '30px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: 'white',
                fontSize: '16px',
              }}
            >
              +
            </button>
          </div>
        </div>

        {addedMessage && (
          <p style={{ color: '#16a34a', fontWeight: 'bold', margin: '0 0 10px 0' }}>
            {addedMessage}
          </p>
        )}

        <button
          onClick={handleAddToCart}
          disabled={adding}
          style={{
            width: '100%',
            backgroundColor: adding ? '#888' : '#BB0000',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '12px',
            fontSize: '16px',
            cursor: adding ? 'not-allowed' : 'pointer',
          }}
        >
          {adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
