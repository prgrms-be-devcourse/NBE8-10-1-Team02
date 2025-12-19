"use client";

import { getItems } from "@/lib/api/item";
import { ItemDto } from "@/lib/types/item";
import { useEffect, useState } from "react";

export default function ItemList({addToCart}: {addToCart: (Item: ItemDto) => void}) {
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
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{item.itemName}</div>
                      <div className="text-sm text-white">{item.price.toLocaleString()} won</div>
                    </div>
                    <button
                      onClick={()=> addToCart(item)}
                      className="rounded-lg border px-3 py-1 text-sm hover:bg-white hover:text-black">
                      담기
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