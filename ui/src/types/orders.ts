import {ITimestamp} from './common';
import {Product} from './products';

export interface OrderView extends ITimestamp {
  id?: string;
  firstName: string;
  lastName: string;
  number_phone: string;
  address: string;
  status: string;
  text?: string;
  products: OrderProductView[];
}

export interface OrderProductView {
  product: Product;
  quantity: number;
}

export interface OrderProduct extends Omit<OrderProductView, 'product'> {
  product: string;
}

export interface OrderViewForm extends Omit<OrderView, 'products'> {
  products: OrderProduct[];
}

export type StatusOder =
  | 'closed'
  | 'processing'
  | 'approved'
  | 'pending'
  | 'removed'
  | 'open'
  | 'complete'
  | 'canceled';
