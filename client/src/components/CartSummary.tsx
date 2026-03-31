import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartSummary() {
  const { state, itemCount, clearCart } = useCart();
  const navigate = useNavigate();

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const subtotal = state.items.reduce((sum, item) => {
    return sum + (item.product?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <div
      style={{
        border: '2px solid #BB0000',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#fff',
      }}
    >
      <h2 style={{ color: '#BB0000', marginTop: 0 }}>Order Summary</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span>Items ({itemCount})</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      <div
        style={{
          borderTop: '1px solid #e0e0e0',
          marginTop: '12px',
          paddingTop: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 'bold',
          fontSize: '18px',
        }}
      >
        <span>Total</span>
        <span style={{ color: '#BB0000' }}>{formatCurrency(subtotal)}</span>
      </div>

      <button
        style={{
          width: '100%',
          backgroundColor: '#BB0000',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '12px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '16px',
        }}
      >
        Proceed to Checkout
      </button>

      <button
        onClick={clearCart}
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          color: '#BB0000',
          border: '1px solid #BB0000',
          borderRadius: '6px',
          padding: '10px',
          fontSize: '14px',
          cursor: 'pointer',
          marginTop: '8px',
        }}
      >
        Clear Cart
      </button>

      <button
        onClick={() => navigate('/')}
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          color: '#666',
          border: 'none',
          padding: '8px',
          fontSize: '14px',
          cursor: 'pointer',
          marginTop: '4px',
          textDecoration: 'underline',
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
}
