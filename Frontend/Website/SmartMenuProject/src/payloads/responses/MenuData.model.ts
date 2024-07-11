export interface MenuData {
  menuId: number;
  menuCode: string;
  createDate: Date;
  imageUrl: string;
  description: string;
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
