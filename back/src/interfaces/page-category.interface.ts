import { Types } from "mongoose";

export interface IPageCategory extends Document {
  readonly name: string;
  readonly link: string;
  readonly parent: Types.ObjectId | null;
  readonly order: number;
  readonly type: "parent" | "link";
}

export interface PageCategoryView {
  id: IPageCategory;
}

export interface CategoryChild {
  id: string;
  readonly name: string;
  readonly link: string;
  readonly parent: Types.ObjectId | null;
  readonly order: number;
  readonly type: "parent" | "link";
}
