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