import { Page, Resource } from "../types/misc";

const DEFAULT_PAGE_INDEX = 0;
const DEFAULT_PAGE_SIZE = 25;

export function createResource<T>(
  data: T[],
  page: Page,
  total: number
): Resource<T> {
  return {
    data,
    page,
    total,
  };
}

export function createEmptyResource<T>(pageSize = 10): Resource<T> {
  return {
    data: [],
    page: {
      pageIndex: -1,
      pageSize,
    },
    total: 0,
  };
}

export function getPageCount<T>(res: Resource<T>): number {
  return Math.floor((res.total - 1) / res.page.pageSize) + 1;
}
export function isLastPage<T>(res: Resource<T>): Boolean {
  const pageCount = getPageCount(res);
  return res.page.pageIndex >= pageCount - 1;
}

export function isEmpty<T>(res: Resource<T>): Boolean {
  return res.page.pageIndex >= 0 && res.data.length === 0;
}

export function hasPreviousPage<T>(res: Resource<T>): Boolean {
  return res.page.pageIndex > 0;
}

export function hasNextPage<T>(res: Resource<T>): Boolean {
  return res.page.pageIndex === -1 || !isLastPage(res);
}

export function getFirstPage<T>(res: Resource<T>): Page {
  return {
    pageIndex: 0,
    pageSize: res.page.pageSize,
  };
}

export function getNextPage<T>(res: Resource<T>): Page | undefined {
  if (hasNextPage(res)) {
    return {
      pageIndex: res.page.pageIndex + 1,
      pageSize: res.page.pageSize,
    };
  }
  return undefined;
}

export function getToPage<T>(res: Resource<T>, target: number): Page {
  return {
    pageIndex: target,
    pageSize: res.page.pageSize,
  };
}

export function getPreviousPage<T>(res: Resource<T>): Page | undefined {
  if (hasPreviousPage(res)) {
    return {
      pageIndex: res.page.pageIndex - 1,
      pageSize: res.page.pageSize,
    };
  }
  return undefined;
}

export function getLastPage<T>(res: Resource<T>): Page {
  const pageCount = getPageCount(res);
  const pageIndex = pageCount > 0 ? pageCount - 1 : 0;
  return {
    pageIndex,
    pageSize: res.page.pageSize,
  };
}

export function isFirstPage<T>(res: Resource<T>): Boolean {
  return res.page.pageIndex === 0;
}

export function makePage(pageIndex?: number, pageSize?: number): Page {
  return {
    pageIndex: pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: pageSize || DEFAULT_PAGE_SIZE,
  };
}

export function mergeResource<T>(
  targetRes: Resource<T>,
  sourceRes: Resource<T>
): Resource<T> {
  sourceRes.data.forEach((item) => targetRes.data.push(item));
  targetRes.page = sourceRes.page;
  targetRes.total = sourceRes.total;
  return targetRes;
}
