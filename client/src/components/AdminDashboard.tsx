import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, updateOrderStatus, type AdminOrder } from '../services/adminService';

const ORDER_STATUSES = ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    getAllOrders()
      .then(setOrders)
      .catch((e: unknown) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  async function handleStatusChange(orderId: number, newStatus: string) {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (e: unknown) {
      alert((e as Error).message);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '32px auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, color: '#BB0000' }}>Admin — All Orders</h2>
        <button onClick={() => navigate('/admin/products')} style={linkButtonStyle}>
          Manage Products
        </button>
      </div>

      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p style={{ color: '#666' }}>No orders have been placed yet.</p>
      )}

      {!loading && !error && orders.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: '#BB0000', color: 'white' }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Confirmation</th>
                <th style={thStyle}>User</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Items</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order.id} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                  <td style={tdStyle}>{order.id}</td>
                  <td style={tdStyle}>
                    <span style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                      {order.confirmationNumber}
                    </span>
                  </td>
                  <td style={tdStyle}>{order.userEmail}</td>
                  <td style={tdStyle}>
                    {new Date(order.orderDate).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    {order.orderItems.length}
                  </td>
                  <td style={tdStyle}>${order.totalAmount.toFixed(2)}</td>
                  <td style={tdStyle}>
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      style={statusSelectStyle(order.status)}
                    >
                      {ORDER_STATUSES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function statusSelectStyle(status: string): React.CSSProperties {
  const colors: Record<string, { bg: string; color: string }> = {
    Placed:     { bg: '#e8f4fd', color: '#1565C0' },
    Processing: { bg: '#fff8e1', color: '#F57F17' },
    Shipped:    { bg: '#e8f5e9', color: '#2E7D32' },
    Delivered:  { bg: '#e0f2f1', color: '#00695C' },
    Cancelled:  { bg: '#fce4ec', color: '#B71C1C' },
  };
  const c = colors[status] ?? { bg: '#f5f5f5', color: '#333' };
  return {
    backgroundColor: c.bg,
    color: c.color,
    border: 'none',
    borderRadius: '4px',
    padding: '4px 8px',
    fontWeight: 600,
    fontSize: '13px',
    cursor: 'pointer',
  };
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
};

const thStyle: React.CSSProperties = {
  padding: '12px 16px',
  textAlign: 'left',
  fontWeight: 600,
  fontSize: '14px',
};

const tdStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '14px',
  borderBottom: '1px solid #eee',
};

const linkButtonStyle: React.CSSProperties = {
  backgroundColor: '#BB0000',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 16px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 600,
};
