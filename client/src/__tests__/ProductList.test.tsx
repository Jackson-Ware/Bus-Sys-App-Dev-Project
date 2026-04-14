import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import { CartProvider } from '../context/CartContext';
import ProductList from '../components/ProductList';
import * as cartService from '../services/cartService';
import type { Product } from '../types/Product';

// cartService is mocked so CartProvider never reaches the real fetch/authService.
vi.mock('../services/cartService');

const mockProducts: Product[] = [
  {
    id: 1, title: 'OSU Hat', description: 'A scarlet hat', price: 25.99,
    category: 'Apparel', sellerName: 'OSU Store', postedDate: '2026-01-01', imageUrl: '',
  },
  {
    id: 2, title: 'OSU Hoodie', description: 'A warm hoodie', price: 49.99,
    category: 'Apparel', sellerName: 'OSU Store', postedDate: '2026-01-01', imageUrl: '',
  },
];

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter>
      <CartProvider>{children}</CartProvider>
    </MemoryRouter>
  );
}

describe('ProductList component', () => {
  beforeEach(() => {
    vi.mocked(cartService.getCart).mockResolvedValue([]);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('shows a loading message while the fetch is in-flight', () => {
    // Stub fetch to a promise that never resolves so loading stays true.
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));

    render(<ProductList />, { wrapper: Wrapper });

    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('renders each product title after a successful fetch', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockProducts,
      }),
    );

    render(<ProductList />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('OSU Hat')).toBeInTheDocument();
      expect(screen.getByText('OSU Hoodie')).toBeInTheDocument();
    });
  });

  it('shows "No products found." when the API returns an empty array', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [],
      }),
    );

    render(<ProductList />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('No products found.')).toBeInTheDocument();
    });
  });

  it('shows an error message when the fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({}),
      }),
    );

    render(<ProductList />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch products')).toBeInTheDocument();
    });
  });
});
