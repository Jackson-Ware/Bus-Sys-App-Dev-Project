import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';

interface Props {
  item: CartItem;
}

export default function CartItemRow({ item }: Props) {
  const { updateQuantity, removeFromCart } = useCart();
  const product = item.product;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  if (!product) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <img
        src={product.imageUrl}
        alt={product.title}
        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
      />

      <div style={{ flex: 1 }}>
        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', color: '#333' }}>{product.title}</p>
        <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#666' }}>{product.category}</p>
        <p style={{ margin: 0, color: '#BB0000', fontWeight: 'bold' }}>
          {formatCurrency(product.price)}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={handleDecrement}
          disabled={item.quantity <= 1}
          style={{
            width: '30px',
            height: '30px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
            backgroundColor: item.quantity <= 1 ? '#f5f5f5' : 'white',
            fontSize: '16px',
          }}
        >
          −
        </button>
        <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 'bold' }}>
          {item.quantity}
        </span>
        <button
          onClick={handleIncrement}
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

      <p style={{ minWidth: '80px', textAlign: 'right', fontWeight: 'bold' }}>
        {formatCurrency(product.price * item.quantity)}
      </p>

      <button
        onClick={() => removeFromCart(item.id)}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: '#BB0000',
          cursor: 'pointer',
          fontSize: '18px',
          padding: '4px',
        }}
        title="Remove item"
      >
        ✕
      </button>
    </div>
  );
}
