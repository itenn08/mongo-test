import {Category} from './categories';

export interface ProductView {
  name: string;
  url: string;
  seoTitle: string;
  seoDescription: string;
  photoUrl: string;
  price: string | null;
  currency: string;
  quantity: string | null;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  category: Category | null;
}

export interface ProductUpdateForm {
  name: string;
  url: string;
  seoTitle: string;
  seoDescription: string;
  photoUrl: string;
  price: string | null;
  currency: string;
  quantity: string | null;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  category: string | null;
}

export interface Product extends ProductView {
  id: string;
}
