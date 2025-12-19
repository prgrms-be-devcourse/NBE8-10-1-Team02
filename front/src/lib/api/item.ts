import { ItemDto } from "../types/item";
import { apiFetch } from "./client";

//api 관리

//다건 조회
export const getItems = (): Promise<ItemDto[]> => {
  return apiFetch("/api/v1/items", {
    method: "GET",
  });
};
