import {FileWithPreview} from '../../components/UploadFile';

export interface BasicSettingsFormModel {
  name: string;
  url: string;
  photoUrl: FileWithPreview[] | null | string;
  text: string;
  isActive: boolean;
  category: string | null;
}

export interface PriceSettingsFormModel {
  price: string | null;
  currency: string;
  quantity: string | null;
}

export interface SEOSettingsFormModel {
  seoTitle: string;
  seoDescription: string;
}

export interface NewProductModel
  extends BasicSettingsFormModel,
    SEOSettingsFormModel,
    PriceSettingsFormModel {}
