export default function Cart({
  cart,
  onIncQty,
  onDecQty,
  onRemove,
  disabled,
}: {
  cart: { id: number; itemName: string; price: number; quantity: number;}[];
  onIncQty: (itemId: number) => void;
  onDecQty: (itemId: number) => void;
  onRemove: (itemId: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="mb-3">
      <div className="mb-2 text-sm font-medium text-black">장바구니</div>

      {/* ✅ 고정 높이 + 스크롤 */}
      <div className="max-h-[180px] overflow-y-auto rounded-xl bg-white/40 p-2">
        {cart.length === 0 ? (
          <div className="text-sm text-black/60">담긴 상품이 없어요.</div>
        ) : (
          <ul className="space-y-2">
            {cart.map((x) => (
              <li key={x.id} className="rounded-lg bg-white/80 p-2">
                <div className="flex items-center justify-between gap-2">
                  {/* 왼쪽: 상품명/금액 */}
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-black">
                      {x.itemName}
                    </div>
                    <div className="text-xs text-black/70">
                      {(x.price * x.quantity).toLocaleString()} won
                    </div>
                  </div>

                  {/* 오른쪽: 수량 컨트롤 + 삭제 */}
                  <div className="flex shrink-0 items-center gap-2">
                    <div className="flex items-center rounded-lg border border-black/20 bg-white">
                      <button
                        type="button"
                        onClick={() => onDecQty(x.id)}
                        disabled={disabled}
                        className="px-2 py-1 text-sm text-black hover:bg-black/5 disabled:opacity-50"
                        aria-label="수량 감소"
                      >
                        -
                      </button>

                      <span className="w-8 text-center text-sm font-semibold text-black">
                        {x.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => onIncQty(x.id)}
                        disabled={disabled}
                        className="px-2 py-1 text-sm text-black hover:bg-black/5 disabled:opacity-50"
                        aria-label="수량 증가"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemove(x.id)}
                      disabled={disabled}
                      className="rounded-lg border border-black/20 bg-white px-2 py-1 text-sm text-black hover:bg-black/5 disabled:opacity-50"
                      aria-label="항목 삭제"
                      title="삭제"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}