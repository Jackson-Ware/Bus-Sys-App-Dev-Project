import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItemRow from './CartItemRow';
import CartSummary from './CartSummary';

export default function CartPage() {
  const { state } = useCart();
  const navigate = useNavigate();

  if (state.loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', color: '#666' }}>Loading cart...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#BB0000', marginBottom: '24px' }}>Your Cart</h1>

      {state.error && (
        <div
          style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #BB0000',
            borderRadius: '6px',
            padding: '12px 16px',
            marginBottom: '16px',
            color: '#BB0000',
          }}
        >
          {state.error}
        </div>
      )}

      {state.successMessage && (
        <div
          style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #16a34a',
            borderRadius: '6px',
            padding: '12px 16px',
            marginBottom: '16px',
            color: '#16a34a',
          }}
        >
          {state.successMessage}
        </div>
      )}

      {state.items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <p style={{ fontSize: '20px', color: '#666', marginBottom: '24px' }}>
            Your cart is empty.
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: '#BB0000',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '12px 24px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
            {state.items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>
          <CartSummary />
        </div>
      )}
    </div>
  );
}
