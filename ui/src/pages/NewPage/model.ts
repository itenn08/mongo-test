import {Category} from '../../types/categories';

export interface BasicSettingsFormModel {
  title: string;
  url: string;
  content: string;
  date: Date | null;
  isActive: boolean;
  category: Category | null;
}

export interface SEOSettingsFormModel {
  seoTitle: string;
  seoDescription: string;
}

export interface NewPageModel
  extends BasicSettingsFormModel,
    SEOSettingsFormModel {}
