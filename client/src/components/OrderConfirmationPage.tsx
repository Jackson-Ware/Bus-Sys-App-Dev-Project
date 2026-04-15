import { useLocation, useNavigate } from 'react-router-dom';
import type { CartItem } from '../types/CartItem';
import type { OrderConfirmation } from '../types/Order';

interface LocationState {
  confirmation: OrderConfirmation;
  items: CartItem[];
  subtotal: number;
}

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  if (!state?.confirmation) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
          No order found. Please place an order first.
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
    );
  }

  const { confirmation, items, subtotal } = state;

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div style={{ padding: '40px 24px', maxWidth: '640px', margin: '0 auto' }}>
      {/* Success banner */}
      <div
        style={{
          backgroundColor: '#f0fdf4',
          border: '2px solid #16a34a',
          borderRadius: '10px',
          padding: '24px',
          textAlign: 'center',
          marginBottom: '32px',
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '8px' }}>✓</div>
        <h1 style={{ color: '#15803d', margin: '0 0 8px', fontSize: '24px' }}>
          Order Placed!
        </h1>
        <p style={{ color: '#166534', margin: 0, fontSize: '15px' }}>
          Thank you for your purchase. Your confirmation number is:
        </p>
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#BB0000',
            margin: '12px 0 0',
            letterSpacing: '4px',
          }}
        >
          {confirmation.confirmationNumber}
        </p>
        <p style={{ color: '#666', fontSize: '13px', marginTop: '6px' }}>
          Placed on {formatDate(confirmation.orderDate)}
        </p>
      </div>

      {/* Items ordered */}
      <div
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            backgroundColor: '#f9f9f9',
            padding: '12px 16px',
            borderBottom: '1px solid #e0e0e0',
            fontWeight: 600,
            color: '#333',
          }}
        >
          Items Ordered
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              borderBottom: '1px solid #f0f0f0',
              fontSize: '14px',
            }}
          >
            <div>
              <div style={{ fontWeight: 500 }}>{item.product?.title}</div>
              <div style={{ color: '#666', fontSize: '12px' }}>Qty: {item.quantity}</div>
            </div>
            <div style={{ fontWeight: 600 }}>
              {formatCurrency((item.product?.price ?? 0) * item.quantity)}
            </div>
          </div>
        ))}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '14px 16px',
            fontWeight: 'bold',
            fontSize: '17px',
            backgroundColor: '#fafafa',
          }}
        >
          <span>Total</span>
          <span style={{ color: '#BB0000' }}>{formatCurrency(subtotal)}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={() => navigate('/orders')}
          style={{
            backgroundColor: '#BB0000',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '12px',
            fontSize: '15px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          View Order History
        </button>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: 'transparent',
            color: '#BB0000',
            border: '1px solid #BB0000',
            borderRadius: '6px',
            padding: '12px',
            fontSize: '15px',
            cursor: 'pointer',
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
