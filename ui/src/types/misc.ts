export interface Page {
  pageIndex: number;
  pageSize: number;
}

export interface Resource<T> {
  data: T[];
  total: number;
  page: Page;
}
