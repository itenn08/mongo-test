export interface PageCategory extends Document {
  readonly name: string;
  readonly link: string;
  readonly parent: PageCategoryView | null;
  readonly order: number;
  readonly type: "parent" | "link";
}

export interface PageCategoryChildrenCategory
  extends Omit<PageCategory, "childrenCategories"> {}

export interface PageCategoryView {
  id: string;
}
