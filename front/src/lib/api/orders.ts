//api관리

import { CreateOrderRequest, CreateOrderResponse } from "@/lib/types/order";
import { apiFetch } from "./client";

export const createOrder = (
  req: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  return apiFetch("/api/v1/orders", {
    method: "POST",
    body: JSON.stringify(req),
  });
};
// src/lib/api/orders.ts
import type {
  OrderListRes,
  OrderDetailResDto,
  OrderUpdateReqDto,
  OrderUpdateRes,
  RsDataDto,
} from "@/lib/types/order";

export async function fetchOrdersByEmail(email: string) {
  return (await apiFetch(
    `/api/v1/orders?email=${encodeURIComponent(email)}`
  )) as OrderListRes;
}

export async function fetchOrderDetail(orderId: number) {
  return (await apiFetch(`/api/v1/orders/${orderId}`)) as OrderDetailResDto;
}

export async function updateOrder(orderId: number, body: OrderUpdateReqDto) {
  return (await apiFetch(`/api/v1/orders/${orderId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  })) as OrderUpdateRes;
}

export async function deleteOrder(orderId: number) {
  return (await apiFetch(`/api/v1/orders/${orderId}`, {
    method: "DELETE",
  })) as RsDataDto<null>;
}
