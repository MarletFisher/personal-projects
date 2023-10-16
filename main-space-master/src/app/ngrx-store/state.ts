import { Product } from '../types/Product';
import { User } from '../types/User';

export interface AppState {
  count: number;
  user: User;
  products: Product[];
  selectedProduct: Product;
  city: string;
}
