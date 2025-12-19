"use client";

import type { OrderDto } from "@/lib/types/order";

type Props = {
  orders: OrderDto[];
  loading: boolean;
  onSelect: (orderId: number) => void;
};

export default function OrdersListPanel({ orders, loading, onSelect }: Props) {
  return (
    <div className="flex-1 rounded-[28px] bg-[#FFE89A] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-auto">
      {loading && orders.length === 0 ? (
        <div className="flex h-full items-center justify-center p-4">...로딩중</div>
      ) : orders.length === 0 ? (
        <div className="flex h-full items-center justify-center p-4">주문 내역이 없습니다.</div>
      ) : (
        <div className="flex flex-col gap-2 p-4">
          {orders.map((order) => (
            <button
              key={order.id}
              type="button"
              onClick={() => onSelect(order.id)}
              className="w-full rounded-2xl bg-white p-4 text-left border border-gray-200
                         transition hover:bg-gray-50 hover:border-gray-300 active:scale-[0.99]"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-black">주문번호 {order.id}</div>
                <div className="text-sm text-gray-500">{new Date(order.createDate).toLocaleString()}</div>
              </div>

              <div className="mt-2 space-y-1">
                {(order.items ?? []).map((it) => (
                  <div
                    key={it.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="truncate text-black">
                      {it.itemName}{" "}
                      <span className="text-gray-500">x {it.quantity}</span>
                    </div>
                    <div className="shrink-0 text-gray-700">
                      {it.price.toLocaleString()}원
                    </div>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}