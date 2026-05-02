import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types/Product';
import type { ProductRequest } from '../services/adminService';
import { createProduct, updateProduct, deleteProduct } from '../services/adminService';
import { API_BASE } from '../api/http';

const EMPTY_FORM: ProductRequest = {
  title: '',
  description: '',
  price: 0,
  category: '',
  sellerName: '',
  imageUrl: '',
};

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  // null = form closed; -1 = new product; n = editing product with id n
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductRequest>(EMPTY_FORM);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then(r => r.json())
      .then(setProducts)
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  function openAdd() {
    setForm(EMPTY_FORM);
    setFormError('');
    setEditingId(-1);
  }

  function openEdit(product: Product) {
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      sellerName: product.sellerName,
      imageUrl: product.imageUrl,
    });
    setFormError('');
    setEditingId(product.id);
  }

  function closeForm() {
    setEditingId(null);
    setFormError('');
  }

  async function handleSave() {
    if (!form.title.trim() || !form.category.trim() || form.price <= 0) {
      setFormError('Title, category, and a positive price are required.');
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      if (editingId === -1) {
        // Create — re-fetch to get the server-assigned id and postedDate
        await createProduct(form);
        const res = await fetch(`${API_BASE}/api/products`);
        setProducts(await res.json());
      } else if (editingId !== null) {
        await updateProduct(editingId, form);
        setProducts(prev =>
          prev.map(p =>
            p.id === editingId
              ? { ...p, ...form }
              : p
          )
        );
      }
      closeForm();
    } catch (e: unknown) {
      setFormError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product: Product) {
    if (!window.confirm(`Delete "${product.title}"? This cannot be undone.`)) return;
    try {
      await deleteProduct(product.id);
      setProducts(prev => prev.filter(p => p.id !== product.id));
    } catch (e: unknown) {
      alert((e as Error).message);
    }
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '32px auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, color: '#BB0000' }}>Admin — Products</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/admin')} style={secondaryButtonStyle}>
            View Orders
          </button>
          <button onClick={openAdd} style={primaryButtonStyle}>
            + Add Product
          </button>
        </div>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Inline form for add / edit */}
      {editingId !== null && (
        <div style={formCardStyle}>
          <h3 style={{ margin: '0 0 16px', color: '#BB0000' }}>
            {editingId === -1 ? 'New Product' : 'Edit Product'}
          </h3>
          <div style={formGridStyle}>
            <label style={labelStyle}>
              Title *
              <input
                style={inputStyle}
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />
            </label>
            <label style={labelStyle}>
              Category *
              <input
                style={inputStyle}
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              />
            </label>
            <label style={labelStyle}>
              Price *
              <input
                style={inputStyle}
                type="number"
                min="0.01"
                step="0.01"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))}
              />
            </label>
            <label style={labelStyle}>
              Seller Name
              <input
                style={inputStyle}
                value={form.sellerName}
                onChange={e => setForm(f => ({ ...f, sellerName: e.target.value }))}
              />
            </label>
            <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>
              Description
              <textarea
                style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
            </label>
            <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>
              Image URL
              <input
                style={inputStyle}
                value={form.imageUrl}
                onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
              />
            </label>
          </div>
          {formError && <p style={{ color: 'red', margin: '8px 0 0' }}>{formError}</p>}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button onClick={handleSave} disabled={saving} style={primaryButtonStyle}>
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button onClick={closeForm} disabled={saving} style={secondaryButtonStyle}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: '#BB0000', color: 'white' }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Seller</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr
                  key={product.id}
                  style={{
                    backgroundColor: editingId === product.id ? '#fff8e1' : i % 2 === 0 ? '#fff' : '#f9f9f9',
                  }}
                >
                  <td style={tdStyle}>{product.id}</td>
                  <td style={tdStyle}>{product.title}</td>
                  <td style={tdStyle}>{product.category}</td>
                  <td style={tdStyle}>${product.price.toFixed(2)}</td>
                  <td style={tdStyle}>{product.sellerName}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => openEdit(product)}
                        style={editButtonStyle}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        style={deleteButtonStyle}
                      >
                        Delete
                      </button>
                    </div>
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

const primaryButtonStyle: React.CSSProperties = {
  backgroundColor: '#BB0000',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 16px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 600,
};

const secondaryButtonStyle: React.CSSProperties = {
  backgroundColor: 'white',
  color: '#BB0000',
  border: '2px solid #BB0000',
  borderRadius: '6px',
  padding: '6px 14px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 600,
};

const editButtonStyle: React.CSSProperties = {
  backgroundColor: '#1565C0',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '4px 10px',
  cursor: 'pointer',
  fontSize: '13px',
};

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: '#B71C1C',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '4px 10px',
  cursor: 'pointer',
  fontSize: '13px',
};

const formCardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  border: '2px solid #BB0000',
  borderRadius: '8px',
  padding: '24px',
  marginBottom: '24px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
};

const formGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
};

const labelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  fontSize: '14px',
  fontWeight: 600,
  color: '#333',
};

const inputStyle: React.CSSProperties = {
  padding: '8px 10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
  fontWeight: 'normal',
};
