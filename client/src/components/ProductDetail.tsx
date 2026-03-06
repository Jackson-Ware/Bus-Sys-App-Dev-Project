import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types/Product';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
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

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  if (!product) {
    return <div style={{ padding: '20px' }}>Product not found</div>;
  }

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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

      <div>
        <h2>Description</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
