export interface BasicSettingsFormModel {
  title: string;
  url: string;
  content: string;
  date: Date | null;
  isActive: boolean;
}

export interface SEOSettingsFormModel {
  seoTitle: string;
  seoDescription: string;
}

export interface NewPageModel
  extends BasicSettingsFormModel,
    SEOSettingsFormModel {}
