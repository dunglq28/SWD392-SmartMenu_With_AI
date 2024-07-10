import { ProductData } from './../payloads/responses/ProductData.model';

export interface MenuList {
    listName: string;
    productData: ProductData[];
    listIndex: number;
  }
  