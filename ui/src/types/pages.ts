import {Category} from './categories';

export interface PageUpdateForm {
  title: string;
  url: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  date: Date;
  isActive: boolean;
  category: Category | null;
}

export interface Page extends PageUpdateForm {
  id: string;
}
