//타입관리
export type ItemDto = {
  id: number;
  createDate: string;
  modifyDate: string;
  itemName: string;
  price: number;
};

export type CartItem = ItemDto & { quantity: number };