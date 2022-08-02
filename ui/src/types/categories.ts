export interface CategoryParent {
  name: string;
  link: string;
  parent: string | null;
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

export interface UpdateCategory {
  name: string;
  link: string;
  parent?: string | null;
  order?: number;
  type?: string;
  children?: Category[];
}
