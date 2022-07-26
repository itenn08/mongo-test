import {MouseEvent} from 'react';

export interface Page {
  pageIndex: number;
  pageSize: number;
}

export interface Resource<T> {
  data: T[];
  total: number;
  page: Page;
}

export interface StringValue {
  value: string;
}

export interface MenuBtnProps {
  label: string;
  action: (event: MouseEvent<HTMLLIElement>) => void;
}
