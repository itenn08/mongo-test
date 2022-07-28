export interface PageCategory extends Document {
  readonly name: string;
  readonly link: string;
  readonly parent_id: string | null;
  readonly order: number;
  readonly type: "parent" | "link";
}

export interface PageCategoryChildrenCategory
  extends Omit<PageCategory, "childrenCategories"> {}

export interface PageCategoryEdit {
  id: string;
}
