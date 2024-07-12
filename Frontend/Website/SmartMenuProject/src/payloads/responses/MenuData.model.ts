export interface MenuData {
  menuId: number;
  menuCode: string;
  createDate: Date;
  imageUrl: string;
  description: string;
  priority: number;
  brandId: number;
}

export interface ListData {
  listId: number;
  listCode: string;
  listName: string;
  totalProduct: string;
  createDate: Date;
  brandId: number;
}

export interface IndexProduct {
  productId: number;
  indexInList: number;
}

export interface ListProductDetails  {
  listId: number;
  indexProducts: IndexProduct[];
}
