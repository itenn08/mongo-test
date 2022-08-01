import {Category} from './categories';

export interface PageView {
  title: string;
  url: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  date: Date;
  isActive: boolean;
  category: Category | null;
}

export interface PageUpdateForm {
  title: string;
  url: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  date: Date;
  isActive: boolean;
  category: string | null;
}

export interface Page extends PageView {
  id: string;
}
