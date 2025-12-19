//타입관리

export type CreateOrderRequest = {
  email: string;
  address: string;
  postcode: string;
  orderItems: { itemId: number; quantity: number }[];
};

export type CreateOrderResponse = {
  resultCode: string;
  msg: string;
  data?: {
    orderId: number;
  };
};
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

export type OrderDetailResDto = {
  id: number;
  createDate: string;
  email: string;
  address: string;
  postcode: string;
  orderItems: OrderItems[]; 
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

export type OrderItem = {
    id: number;
    itemId: number;
    itemName: string;
    price: number;
    quantity: number;
};

export type Order = {
    id: number;
    createDate: string;
    email: string;
    items: OrderItem[];
};
