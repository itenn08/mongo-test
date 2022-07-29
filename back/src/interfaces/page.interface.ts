import { Types } from "mongoose";
import { PageCategory } from "src/interfaces/pageCategory.interface";

export interface Page extends Document {
  readonly title: string;
  readonly url: string;
  readonly content: string;
  readonly seoTitle: string;
  readonly seoDescription: string;
  readonly date: Date | null;
  readonly isActive: boolean;
  readonly category: PageCategory;
}

export interface PageEdit {
  id: Types.ObjectId;
}
