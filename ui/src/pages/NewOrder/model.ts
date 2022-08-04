import {OrderProductView} from '../../types/orders';

export interface BasicSettingsFormModel {
  firstName: string;
  lastName: string;
  number_phone: string;
  address: string;
  status: string;
  text: string;
}

export interface ProductFormModel {
  products: OrderProductView[];
}
