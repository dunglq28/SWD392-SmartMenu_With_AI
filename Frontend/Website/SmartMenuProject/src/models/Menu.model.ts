import { ProductData } from "./../payloads/responses/ProductData.model";

export interface Menu {
  isActive: boolean;
  segmentId: number[];
  BrandId: number;
  Description: string;
  menuImage: File | null;
}

export interface MenuList {
  listName: string;
  productData: ProductData[];
  listIndex: number;
}
