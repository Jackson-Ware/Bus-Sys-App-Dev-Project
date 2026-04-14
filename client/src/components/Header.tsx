import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate('/login');
  }

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

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isAuthenticated ? (
          <>
            <span style={{ fontSize: '14px', opacity: 0.9 }}>
              {user?.email}
              {user?.role === 'Admin' && (
                <span
                  style={{
                    marginLeft: '6px',
                    backgroundColor: 'white',
                    color: '#BB0000',
                    borderRadius: '4px',
                    padding: '1px 6px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                  }}
                >
                  ADMIN
                </span>
              )}
            </span>

            <button
              onClick={() => navigate('/cart')}
              style={navButtonStyle}
            >
              Cart
              {itemCount > 0 && (
                <span style={badgeStyle}>{itemCount}</span>
              )}
            </button>

            <button onClick={handleLogout} style={navButtonStyle}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} style={navButtonStyle}>
              Sign In
            </button>
            <button onClick={() => navigate('/register')} style={navButtonStyle}>
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}

const navButtonStyle: React.CSSProperties = {
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
};

const badgeStyle: React.CSSProperties = {
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
};
