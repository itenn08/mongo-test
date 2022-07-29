export interface PageUpdateForm {
  title: string;
  url: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  date: Date;
  isActive: boolean;
  category: string;
}

export interface Page extends PageUpdateForm {
  id: string;
}
