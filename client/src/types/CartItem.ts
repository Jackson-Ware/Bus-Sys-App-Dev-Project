import type { Product } from './Product';

export interface CartItem {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  addedDate: string;
  product: Product | null;
}
