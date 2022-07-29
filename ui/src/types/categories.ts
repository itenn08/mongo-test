export interface CategoryParent {
  name: string;
  link: string;
  parent_id: string;
  order: number;
  type: string;
  children?: Category[];
}

export interface Category extends CategoryParent {
  id: string;
}

export interface CategoryFetch {
  data: Category[];
  total: number;
}
