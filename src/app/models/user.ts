export interface Address {
  id: number;
  street: string;
  city: string;
  zip: string;
  country: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  addresses: Address[];
  favorites: number[];
  orders: number[];
}
