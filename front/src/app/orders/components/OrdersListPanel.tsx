"use client";

import type { OrderDto } from "@/lib/types/order";

type Props = {
  orders: OrderDto[];
  loading: boolean;
  selectedOrderId: number | null;
  onSelect: (orderId: number) => void;
};

export default function OrdersListPanel({ orders, loading, selectedOrderId, onSelect }: Props) {
  const calculateOrderTotal = (order: OrderDto) => {
    return (order.items ?? []).reduce((sum, it) => sum + it.price * it.quantity, 0);
  };

  return (
    <div className="flex-1 rounded-[28px] bg-gradient-to-br from-[#FFE89A] to-[#FFD54F] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-auto">
      {loading && orders.length === 0 ? (
        <div className="flex h-full items-center justify-center p-4">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
            <div className="text-black font-medium">주문 목록을 불러오는 중...</div>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex h-full items-center justify-center p-4">
          <div className="text-center">
            <div className="text-4xl mb-2">📦</div>
            <div className="text-black font-semibold text-lg">주문 내역이 없습니다</div>
            <div className="text-black/70 text-sm mt-1">이메일로 주문을 검색해보세요</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 p-2">
          {orders.map((order) => {
            const isSelected = selectedOrderId === order.id;
            const total = calculateOrderTotal(order);
            
            return (
              <button
                key={order.id}
                type="button"
                onClick={() => onSelect(order.id)}
                className={`w-full rounded-2xl p-4 text-left border-2 transition-all duration-200
                  ${
                    isSelected
                      ? "bg-white border-amber-500 shadow-lg scale-[1.02]"
                      : "bg-white/90 border-gray-200 hover:bg-white hover:border-amber-300 hover:shadow-md"
                  }
                  active:scale-[0.98]`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`font-bold text-lg ${isSelected ? "text-amber-600" : "text-black"}`}>
                      주문 #{order.id}
                    </div>
                    {isSelected && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                        선택됨
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(order.createDate).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                <div className="mt-3 space-y-1.5 mb-3">
                  {(order.items ?? []).slice(0, 3).map((it) => (
                    <div
                      key={it.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="truncate text-black">
                        {it.itemName}
                        <span className="text-gray-500 ml-1">× {it.quantity}</span>
                      </div>
                      <div className="shrink-0 text-gray-700 font-medium">
                        {(it.price * it.quantity).toLocaleString()}원
                      </div>
                    </div>
                  ))}
                  {(order.items ?? []).length > 3 && (
                    <div className="text-xs text-gray-500 pt-1">
                      외 {(order.items ?? []).length - 3}개 항목...
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs text-gray-500">총 주문 금액</span>
                  <span className="font-bold text-base text-gray-900">
                    {total.toLocaleString()}원
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}