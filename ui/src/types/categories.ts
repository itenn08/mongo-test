// export interface CategoryUpdateForm {
//   name: string;
//   link: string;
//   parent: string;
//   order: number;
//   position: number;
// }

export interface CategoryUpdateForm {
  name: string;
  link: string;
  parent_id: string;
  order: number;
  type: string;
  children: CategoryChild[];
}

export interface CategoryChild {
  name: string;
  link: string;
  parent_id: string;
  order: number;
  type: string;
}

export interface Category extends CategoryUpdateForm {
  id: string;
}

export interface CategoryFetch {
  data: Category[];
  total: number;
}
