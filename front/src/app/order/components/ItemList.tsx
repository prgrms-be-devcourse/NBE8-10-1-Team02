"use client";

import { getItems } from "@/lib/api/item";
import { ItemDto } from "@/lib/types/item";
import toImageSrc from "@/lib/utils/toImageSrc";
import { useEffect, useState } from "react";

export default function ItemList({addToCart, textColor = "text-white", buttonName = "담기"}: {addToCart: (Item: ItemDto) => void; textColor?: string; buttonName?: string}) {
  const [items, setItems] = useState<ItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadItems() {
      try {
        setLoading(true);
        setError(null);

        const data = await getItems();
        if (!cancelled) {
          setItems(data);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message ?? "상품 목록 조회 실패");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadItems();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="h-full rounded-2xl border p-4">
      <div className="mb-3 text-sm font-medium text-white">상품목록</div>

        <div className="h-[520px] overflow-auto rounded-xl border p-3">
          {loading && <div className="text-sm text-gray-500">불러오는 중…</div>}
          {error && <div className="text-sm text-red-600">{error}</div>}

          {!loading && !error && (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="rounded-xl border p-3">
                <div className="flex items-center gap-3">
                  {/* 썸네일 */}
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-white/10">
                    {/* Next/Image 써도 되고, 일단 img로 빠르게 */}
                    <img
                      src={toImageSrc(item.imageUrl)}
                      alt={item.itemName}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/placeholder.gif";
                      }}
                    />
                  </div>
              
                  {/* 텍스트 */}
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{item.itemName}</div>
                    <div className={`text-sm ${textColor}`}>{item.price.toLocaleString()} won</div>
                  </div>
              
                  {/* 버튼 */}
                  <button
                    onClick={() => addToCart(item)}
                    className="shrink-0 rounded-lg border px-3 py-1 text-sm hover:bg-white hover:text-black"
                  >
                    {buttonName}
                  </button>
                </div>
              </li>
              ))}
            </ul>
          )}
        </div>
      </div>
  );
}