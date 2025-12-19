"use client";

import type { OrderDetailResDto, OrderUpdateReqDto } from "@/lib/types/order";

type Props = {
  selectedOrderId: number | null;
  loading: boolean;
  detail: OrderDetailResDto | null;
  form: OrderUpdateReqDto | null;
  setForm: (next: OrderUpdateReqDto) => void;
  saving: boolean;
  errorMsg: string;
  onRollback: () => void;
  onSave: () => void;
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

  const miniBtn =
    "h-8 w-8 rounded-full bg-neutral-200 text-neutral-800 font-bold " +
    "hover:bg-neutral-300 active:scale-[0.98] disabled:opacity-50";

  if (!selectedOrderId) {
    return (
      <div className="flex-1 rounded-[28px] bg-neutral-50 text-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-auto p-6">
        <div className="text-gray-500 flex h-full items-center justify-center">
          왼쪽에서 주문을 선택하세요.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 rounded-[28px] bg-neutral-50 text-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-auto p-6">
        <div className="text-gray-500 flex h-full items-center justify-center">
          상세 불러오는 중...
        </div>
      </div>
    );
  }

  if (!detail || !form) {
    return (
      <div className="flex-1 rounded-[28px] bg-neutral-50 text-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-auto p-6">
        <div className="text-red-600 flex h-full items-center justify-center text-center">
          <div>
            <div>상세내역을 불러오지 못했습니다.</div>
            {errorMsg ? (
              <div className="mt-2 text-sm text-gray-700">{errorMsg}</div>
            ) : null}
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
    <div className="flex-1 rounded-[28px] bg-neutral-50 text-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-auto p-6">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <div className="text-xl font-bold text-gray-800">
            내역 : 주문번호 {detail.id}
          </div>
          <div className="text-sm text-gray-500">
            주문 날짜 : {new Date(detail.createDate).toLocaleString()}
          </div>
        </div>

        {errorMsg ? (
          <div className="rounded border border-red-200 bg-red-50 p-3 text-red-700 text-sm">
            {errorMsg}
          </div>
        ) : null}

        <div className="space-y-3">
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <input
              className="w-full rounded-xl border border-gray-300 bg-[#A7A7A7] px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-amber-300"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <div className="text-sm text-gray-500">Address</div>
            <input
              className="w-full rounded-xl border border-gray-300 bg-[#A7A7A7] px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-amber-300"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div>
            <div className="text-sm text-gray-500">Postcode</div>
            <input
              className="w-full rounded-xl border border-gray-300 bg-[#A7A7A7] px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-amber-300"
              value={form.postcode}
              onChange={(e) => setForm({ ...form, postcode: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-gray-800">Items</div>

          {visibleItems.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
              아이템이 없습니다.
            </div>
          ) : (
            visibleItems.map((it) => {
              const qty = getQty(it.itemId, it.quantity ?? 1);
              const lineTotal = it.price * qty;

              return (
                <div
                  key={it.id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_6px_0_rgba(0,0,0,0.08)] flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                      {it.itemName}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      단가 {it.price.toLocaleString()}원 · 소계{" "}
                      <span className="font-semibold text-gray-900">
                        {lineTotal.toLocaleString()}원
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      itemId: {it.itemId}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      className={miniBtn}
                      disabled={saving}
                      onClick={() => setQty(it.itemId, qty - 1)}
                    >
                      -
                    </button>

                    <input
                      className="no-spinner w-20 rounded-xl border border-gray-300 bg-white px-3 py-2 text-right text-gray-900 outline-none focus:ring-2 focus:ring-amber-300"
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(e) => setQty(it.itemId, Number(e.target.value))}
                    />

                    <button
                      type="button"
                      className={miniBtn}
                      disabled={saving}
                      onClick={() => setQty(it.itemId, qty + 1)}
                    >
                      +
                    </button>

                    <button
                      type="button"
                      className={miniBtn}
                      disabled={saving}
                      onClick={() => handleDeleteItem(it.itemId)}
                      title="삭제"
                    >
                      x
                    </button>
                  </div>
                </div>
              );
            })
          )}

          <div className="mt-4 rounded-2xl bg-gray-50 border border-gray-200 p-4 flex items-center justify-between">
            <div className="text-gray-700 font-bold">total:</div>
            <div className="text-gray-900 font-black text-lg">
              {totalPrice.toLocaleString()} won
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            className="rounded-full bg-neutral-200 px-6 py-2 font-bold text-neutral-900 hover:bg-neutral-300 disabled:opacity-50"
            disabled={saving}
            onClick={onRollback}
          >
            reset
          </button>

          <button
            type="button"
            className="rounded-full bg-[#FFE89A] px-6 py-2 font-bold text-neutral-900 hover:bg-amber-200 disabled:opacity-50"
            disabled={saving}
            onClick={onSave}
          >
            {saving ? "저장중..." : "update"}
          </button>
        </div>
      </form>
    </div>
  );
}