import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const navigate = useNavigate();
  const { itemCount } = useCart();

  return (
    <header
      style={{
        backgroundColor: '#BB0000',
        color: 'white',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
      }}
    >
      <h1
        onClick={() => navigate('/')}
        style={{ margin: 0, fontSize: '22px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        OSU Campus Store
      </h1>

      <button
        onClick={() => navigate('/cart')}
        style={{
          backgroundColor: 'transparent',
          border: '2px solid white',
          color: 'white',
          borderRadius: '6px',
          padding: '6px 14px',
          cursor: 'pointer',
          fontSize: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        🛒 Cart
        {itemCount > 0 && (
          <span
            style={{
              backgroundColor: 'white',
              color: '#BB0000',
              borderRadius: '50%',
              width: '22px',
              height: '22px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: 'bold',
            }}
          >
            {itemCount}
          </span>
        )}
      </button>
    </header>
  );
}
