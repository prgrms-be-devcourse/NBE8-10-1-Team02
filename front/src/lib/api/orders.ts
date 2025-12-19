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