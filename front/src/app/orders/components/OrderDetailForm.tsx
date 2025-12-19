"use client";

import type { OrderDetailResDto, OrderUpdateReqDto } from "@/lib/types/order";

type Props = {
  selectedOrderId: number | null;
  loading: boolean;
  detail: OrderDetailResDto | null;
  form: OrderUpdateReqDto | null;
  setForm: (next: OrderUpdateReqDto) => void;
  saving: boolean;
  errorMsg: string[];
  onRollback: () => void;
  onSave: () => void;
  onDeleteAll: () => void;
};

export default function OrderDetailForm({
  selectedOrderId,
  loading,
  detail,
  form,
  setForm,
  saving,
  errorMsg,
  onRollback,
  onSave,
  onDeleteAll,
}: Props) {
  const getQty = (itemId: number, fallback: number) => {
    if (!form) return fallback;
    const found = form.orderItems.find((x) => x.itemId === itemId);
    return found?.quantity ?? fallback;
  };

  const setQty = (itemId: number, nextQty: number) => {
    if (!form) return;
    const safeQty = Number.isFinite(nextQty) ? Math.max(1, nextQty) : 1;

    const exists = form.orderItems.some((x) => x.itemId === itemId);

    const nextOrderItems = exists
      ? form.orderItems.map((x) =>
          x.itemId === itemId ? { ...x, quantity: safeQty } : x
        )
      : [...form.orderItems, { itemId, quantity: safeQty }];

    setForm({ ...form, orderItems: nextOrderItems });
  };

  const handleDeleteItem = (itemId: number) => {
    if (!form) return;

    setForm({
      ...form,
      orderItems: form.orderItems.filter((x) => x.itemId !== itemId),
    });
  };

  if (!selectedOrderId) {
    return (
      <div className="flex-1 rounded-[28px] bg-gradient-to-br from-neutral-50 to-neutral-100 text-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-auto p-6">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📋</div>
            <div className="text-gray-600 text-lg font-medium">주문을 선택해주세요</div>
            <div className="text-gray-400 text-sm mt-2">왼쪽 목록에서 주문을 선택하면 상세 정보를 확인할 수 있습니다</div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 rounded-[28px] bg-gradient-to-br from-neutral-50 to-neutral-100 text-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-auto p-6">
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
            <div className="text-gray-600 font-medium">주문 상세 정보를 불러오는 중...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!detail || !form) {
    return (
      <div className="flex-1 rounded-[28px] bg-gradient-to-br from-neutral-50 to-neutral-100 text-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-auto p-6">
        <div className="flex h-full items-center justify-center text-center">
          <div>
            <div className="text-5xl mb-3">⚠️</div>
            <div className="text-red-600 font-semibold text-lg mb-2">상세 정보를 불러오지 못했습니다</div>
            {errorMsg.length > 0 && (
              <div className="mt-3 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                {errorMsg.map((msg, idx) => (
                  <div key={idx}>{msg}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const visibleItems = detail.orderItems.filter((it) =>
    form.orderItems.some((x) => x.itemId === it.itemId)
  );

  const totalPrice = visibleItems.reduce((sum, it) => {
    const qty = getQty(it.itemId, it.quantity ?? 1);
    return sum + it.price * qty;
  }, 0);

  return (
    <div className="flex-1 rounded-[28px] bg-gradient-to-br from-neutral-50 to-neutral-100 text-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-auto p-6">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* 헤더 */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-amber-600 font-bold">#{detail.id}</span>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">주문 상세 정보</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {new Date(detail.createDate).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {errorMsg.length > 0 ? (
          <div className="rounded-xl border-2 border-red-300 bg-red-50/90 p-4 text-red-700 text-sm font-medium shadow-[0_4px_12px_rgba(239,68,68,0.15)]">
            <div className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">⚠</span>
              <div className="flex-1">
                {errorMsg.length === 1 ? (
                  <span>{errorMsg[0]}</span>
                ) : (
                  <ul className="list-disc list-inside space-y-1">
                    {errorMsg.map((msg, idx) => (
                      <li key={idx}>{msg}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {/* 주문 정보 입력 */}
        <div className="space-y-4">
          <div className="text-sm font-semibold text-gray-700 mb-3">주문자 정보</div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              이메일 주소 <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-2.5 text-gray-900 
                outline-none transition-all duration-200
                focus:ring-2 focus:ring-amber-400 focus:border-amber-400
                disabled:bg-gray-100 disabled:cursor-not-allowed"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={saving}
              placeholder="example@email.com"
              aria-label="이메일 주소"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              배송 주소 <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-2.5 text-gray-900 
                outline-none transition-all duration-200
                focus:ring-2 focus:ring-amber-400 focus:border-amber-400
                disabled:bg-gray-100 disabled:cursor-not-allowed"
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              disabled={saving}
              placeholder="서울시 강남구 테헤란로..."
              aria-label="배송 주소"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              우편번호 <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-2.5 text-gray-900 
                outline-none transition-all duration-200
                focus:ring-2 focus:ring-amber-400 focus:border-amber-400
                disabled:bg-gray-100 disabled:cursor-not-allowed"
              type="text"
              value={form.postcode}
              onChange={(e) => setForm({ ...form, postcode: e.target.value })}
              disabled={saving}
              placeholder="12345"
              aria-label="우편번호"
            />
          </div>
        </div>

        {/* 주문 항목 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-gray-700">주문 항목</div>
            <div className="text-xs text-gray-500">
              {visibleItems.length}개 상품
            </div>
          </div>

          {visibleItems.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
              <div className="text-4xl mb-2">🛒</div>
              <div className="text-sm text-gray-500 font-medium">주문 항목이 없습니다</div>
            </div>
          ) : (
            visibleItems.map((it) => {
              const qty = getQty(it.itemId, it.quantity ?? 1);
              const lineTotal = it.price * qty;

              return (
                <div
                  key={it.id}
                  className="rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 truncate text-base mb-1">
                      {it.itemName}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-600">
                        단가: <span className="font-medium text-gray-900">{it.price.toLocaleString()}원</span>
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-600">
                        소계: <span className="font-bold text-amber-600">{lineTotal.toLocaleString()}원</span>
                      </span>
                    </div>
                  </div>

                  {/* 오른쪽: 수량 컨트롤 + 삭제 */}
                  <div className="flex shrink-0 items-center gap-2">
                    <div className="flex items-center rounded-lg border border-black/20 bg-white">
                      <button
                        type="button"
                        onClick={() => {
                          if (qty === 1) {
                            handleDeleteItem(it.itemId);
                          } else {
                            setQty(it.itemId, qty - 1);
                          }
                        }}
                        disabled={saving}
                        className="px-2 py-1 text-sm text-black hover:bg-black/5 disabled:opacity-50"
                        aria-label="수량 감소"
                      >
                        -
                      </button>

                      <span className="w-8 text-center text-sm font-semibold text-black">
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => setQty(it.itemId, qty + 1)}
                        disabled={saving}
                        className="px-2 py-1 text-sm text-black hover:bg-black/5 disabled:opacity-50"
                        aria-label="수량 증가"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteItem(it.itemId)}
                      disabled={saving}
                      className="rounded-lg border border-black/20 bg-white px-2 py-1 text-sm text-black hover:bg-black/5 disabled:opacity-50"
                      aria-label="항목 삭제"
                      title="삭제"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })
          )}

          {/* 총액 */}
          <div className="mt-4 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 p-5 flex items-center justify-between">
            <div className="text-gray-700 font-bold text-base">총 주문 금액</div>
            <div className="text-gray-900 font-black text-2xl text-amber-600">
              {totalPrice.toLocaleString()}원
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            className="rounded-xl bg-red-500 px-6 py-2.5 font-bold text-white 
              hover:bg-red-600 hover:shadow-lg active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            disabled={saving}
            onClick={onDeleteAll}
            aria-label="주문 삭제"
          >
            삭제
          </button>
          <button
            type="button"
            className="rounded-xl bg-gray-200 px-6 py-2.5 font-bold text-gray-900 
              hover:bg-gray-300 hover:shadow-md active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            disabled={saving}
            onClick={onRollback}
            aria-label="변경사항 초기화"
          >
            초기화
          </button>
          <button
            type="button"
            className="rounded-xl bg-[#FFE89A] px-6 py-2.5 font-bold text-gray-900 
              hover:bg-amber-200 hover:shadow-lg active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
            disabled={saving}
            onClick={onSave}
            aria-label="주문 정보 저장"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></span>
                저장 중...
              </span>
            ) : (
              "저장"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}