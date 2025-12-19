//타입관리
export type ItemDto = {
  id: number;
  createDate: string;
  modifyDate: string;
  itemName: string;
  price: number;
  imageUrl?: string | null;
};

export type CartItem = ItemDto & { quantity: number };