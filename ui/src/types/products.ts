import {FileWithPreview} from '../components/UploadFile';
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
  signedPhotoUrl: string;
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
  image?: FileWithPreview[] | null;
}

export interface Product extends ProductView {
  id: string;
}
