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
  id?: number;
  userId?: number;
  items: OrderItem[];
  total: number;
  shippingAddress: ShippingAddress;
  status: string;
  date: string;
}

export interface OrderCreate {
  user: { id: number };
  items: { product: { id: number }; quantity: number; price: number }[];
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
  };
  status: string;
  date: string;
}
