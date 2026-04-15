export interface OrderItem {
  id: number;
  orderId: number;
  productId: number | null;
  productTitle: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: string;
  confirmationNumber: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  orderItems: OrderItem[];
}

export interface OrderConfirmation {
  orderId: number;
  confirmationNumber: string;
  orderDate: string;
  totalAmount: number;
}

export interface CheckoutFormData {
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
}
