import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#BB0000', fontSize: '32px', marginBottom: '30px' }}>
        OSU Campus Store
      </h1>

      {loading && <p style={{ fontSize: '18px' }}>Loading products...</p>}

      {!loading && products.length === 0 && !error && (
        <p style={{ fontSize: '18px' }}>No products found.</p>
      )}

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && products.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
