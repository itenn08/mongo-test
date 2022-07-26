export interface PageUpdateForm {
  title: string;
  url: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  date: Date;
  isActive: boolean;
}

export interface Page {
  id: string;
  title: string;
  url: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  date: Date;
  isActive: boolean;
}
