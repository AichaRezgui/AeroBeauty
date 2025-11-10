export interface ShippingAddress {
  street: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
}
export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  shippingAddress: ShippingAddress;
  status: string;
  date: string;
}
