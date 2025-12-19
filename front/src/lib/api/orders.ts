//api관리
// src/lib/api/orders.ts
import { apiFetch } from "@/lib/api/client";
import type {
  OrderListRes,
  OrderDetailResDto,
  OrderUpdateReqDto,
  OrderUpdateRes,
} from "@/lib/types/order";

export async function fetchOrdersByEmail(email: string) {
  return (await apiFetch(
    `/orders?email=${encodeURIComponent(email)}`
  )) as OrderListRes;
}

export async function fetchOrderDetail(orderId: number) {
  return (await apiFetch(`/orders/${orderId}`)) as OrderDetailResDto;
}

export async function updateOrder(orderId: number, body: OrderUpdateReqDto) {
  return (await apiFetch(`/orders/${orderId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  })) as OrderUpdateRes;
}