//타입관리
export type RsDataDto<T> = {
  resultCode: string;
  msg: string;
  data: T;
}

export type OrderDto = {
  createDate: string;
  id: number;
  items: OrderItems[];
}

export type OrderItems = {
  id: number;
  itemId: number;
  itemName: string;
  price: number;
  quantity: number;
}

export type OrderDetailDto = OrderDto & {
  email: string;
  address: string;
  postcode: string;
};

export type OrderUpdateReqDto = {
  email: string;
  address: string;
  postcode: string;
  orderItems: {
    itemId: number;
    quantity: number;
  }[];
};

export type OrderListRes = RsDataDto<OrderDto[]>;
export type OrderUpdateRes = RsDataDto<{ orderId: number }>;