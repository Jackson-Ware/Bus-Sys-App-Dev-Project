import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../services/orderService';
import type { Order } from '../types/Order';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    getMyOrders()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load orders.');
        setLoading(false);
      });
  }, []);

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  function toggleExpand(id: number) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
        Loading order history…
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '760px', margin: '0 auto' }}>
      <h1 style={{ color: '#BB0000', marginBottom: '24px' }}>Order History</h1>

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

      {orders.length === 0 && !error ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
            You haven't placed any orders yet.
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.map((order) => {
            const expanded = expandedIds.has(order.id);
            return (
              <div
                key={order.id}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                {/* Order header row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 20px',
                    backgroundColor: '#fafafa',
                    borderBottom: expanded ? '1px solid #e0e0e0' : 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleExpand(order.id)}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '15px', color: '#333' }}>
                      Confirmation:{' '}
                      <span
                        style={{
                          fontFamily: 'monospace',
                          color: '#BB0000',
                          letterSpacing: '2px',
                        }}
                      >
                        {order.confirmationNumber}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>
                      {formatDate(order.orderDate)} · {order.orderItems.length} item
                      {order.orderItems.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, fontSize: '16px', color: '#BB0000' }}>
                        {formatCurrency(order.totalAmount)}
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          backgroundColor: '#f0fdf4',
                          color: '#16a34a',
                          border: '1px solid #16a34a',
                          borderRadius: '4px',
                          padding: '1px 8px',
                          display: 'inline-block',
                          marginTop: '2px',
                        }}
                      >
                        {order.status}
                      </div>
                    </div>
                    <span style={{ color: '#999', fontSize: '18px' }}>
                      {expanded ? '▲' : '▼'}
                    </span>
                  </div>
                </div>

                {/* Expandable items */}
                {expanded && (
                  <div>
                    {order.orderItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 20px',
                          borderBottom: '1px solid #f0f0f0',
                          fontSize: '14px',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 500 }}>{item.productTitle}</div>
                          <div style={{ color: '#666', fontSize: '12px' }}>
                            {formatCurrency(item.unitPrice)} each · Qty {item.quantity}
                          </div>
                        </div>
                        <div style={{ fontWeight: 600 }}>
                          {formatCurrency(item.unitPrice * item.quantity)}
                        </div>
                      </div>
                    ))}

                    {/* Shipping address */}
                    <div
                      style={{
                        padding: '12px 20px',
                        backgroundColor: '#f9f9f9',
                        fontSize: '13px',
                        color: '#555',
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>Ship to: </span>
                      {order.shippingName}, {order.shippingAddress}, {order.shippingCity},{' '}
                      {order.shippingState} {order.shippingZip}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
