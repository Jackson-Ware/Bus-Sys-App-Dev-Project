import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/orderService';
import type { CheckoutFormData, OrderConfirmation } from '../types/Order';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  fontSize: '15px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '4px',
  fontWeight: 600,
  fontSize: '14px',
  color: '#333',
};

const fieldStyle: React.CSSProperties = {
  marginBottom: '16px',
};

export default function CheckoutPage() {
  const { state, itemCount, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState<CheckoutFormData>({
    shippingName: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = state.items.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
    0
  );

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  if (state.items.length === 0 && !submitting) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
          Your cart is empty. Add items before checking out.
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      // Snapshot items before clearCart wipes local state
      const placedItems = state.items;
      const placedSubtotal = subtotal;

      const confirmation: OrderConfirmation = await placeOrder(form);

      // Clear cart locally — backend already deleted cart rows in the order transaction
      // clearCart() calls DELETE /api/cart/clear which is a harmless no-op on an empty cart
      await clearCart();

      navigate('/order-confirmation', {
        state: { confirmation, items: placedItems, subtotal: placedSubtotal },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#BB0000', marginBottom: '24px' }}>Checkout</h1>

      {error && (
        <div
          style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #BB0000',
            borderRadius: '6px',
            padding: '12px 16px',
            marginBottom: '20px',
            color: '#BB0000',
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px' }}>
        {/* Shipping form */}
        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#333' }}>
            Shipping Information
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="shippingName">Full Name</label>
              <input
                id="shippingName"
                name="shippingName"
                type="text"
                required
                value={form.shippingName}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Jane Doe"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="shippingAddress">Street Address</label>
              <input
                id="shippingAddress"
                name="shippingAddress"
                type="text"
                required
                value={form.shippingAddress}
                onChange={handleChange}
                style={inputStyle}
                placeholder="123 High St"
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 80px 110px',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div>
                <label style={labelStyle} htmlFor="shippingCity">City</label>
                <input
                  id="shippingCity"
                  name="shippingCity"
                  type="text"
                  required
                  value={form.shippingCity}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Columbus"
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="shippingState">State</label>
                <input
                  id="shippingState"
                  name="shippingState"
                  type="text"
                  required
                  maxLength={2}
                  value={form.shippingState}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="OH"
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="shippingZip">ZIP Code</label>
                <input
                  id="shippingZip"
                  name="shippingZip"
                  type="text"
                  required
                  value={form.shippingZip}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="43210"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                backgroundColor: submitting ? '#999' : '#BB0000',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '14px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: submitting ? 'not-allowed' : 'pointer',
                marginTop: '8px',
              }}
            >
              {submitting ? 'Placing Order…' : `Place Order — ${formatCurrency(subtotal)}`}
            </button>

            <button
              type="button"
              onClick={() => navigate('/cart')}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                color: '#666',
                border: 'none',
                padding: '10px',
                fontSize: '14px',
                cursor: 'pointer',
                marginTop: '6px',
                textDecoration: 'underline',
              }}
            >
              ← Back to Cart
            </button>
          </form>
        </div>

        {/* Order summary sidebar */}
        <div
          style={{
            border: '2px solid #BB0000',
            borderRadius: '8px',
            padding: '20px',
            alignSelf: 'start',
          }}
        >
          <h2 style={{ color: '#BB0000', marginTop: 0, fontSize: '18px' }}>
            Order Summary
          </h2>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
            {itemCount} item{itemCount !== 1 ? 's' : ''}
          </p>
          {state.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '14px',
                marginBottom: '8px',
              }}
            >
              <span
                style={{
                  maxWidth: '160px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.product?.title} ×{item.quantity}
              </span>
              <span>{formatCurrency((item.product?.price ?? 0) * item.quantity)}</span>
            </div>
          ))}
          <div
            style={{
              borderTop: '1px solid #e0e0e0',
              marginTop: '12px',
              paddingTop: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
              fontSize: '17px',
            }}
          >
            <span>Total</span>
            <span style={{ color: '#BB0000' }}>{formatCurrency(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
