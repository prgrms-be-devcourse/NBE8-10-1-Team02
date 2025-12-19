"use client";

import { CartItem, ItemDto } from "@/lib/types/item";
import ItemList from "./ItemList";
import OrderInfo from "./OrderInfo";
import { useMemo, useState } from "react";
import { createOrder } from "@/lib/api/orders";

export default function BodySection() {
  const [cart, setCart] = useState<CartItem[]>([]);
  // 주문 상태 UI용
  const [ordering, setOrdering] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);

  const addToCart = (item: ItemDto) => {
    setCart((prev) => {
      const found = prev.find((x) => x.id === item.id);
      if (found) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const totalPrice = useMemo(
    () => cart.reduce((sum, x) => sum + x.price * x.quantity, 0),
    [cart]
  );

  const handleOrder = async (form: { email: string; address: string; postcode: string }) => {
    setOrderError(null);
    setOrderId(null);

    if (ordering) return;

    // 간단 검증
    if (!form.email.trim() || !form.address.trim() || !form.postcode.trim()) {
      setOrderError("이메일/주소/우편번호를 모두 입력해주세요.");
      return;
    }
    if (cart.length === 0) {
      setOrderError("장바구니가 비어있습니다.");
      return;
    }

    try {
      setOrdering(true);

      const payload = {
        email: form.email.trim(),
        address: form.address.trim(),
        postcode: form.postcode.trim(),
        orderItems: cart.map((x) => ({
          itemId: x.id,
          quantity: x.quantity,
        })),
      };

      const res = await createOrder(payload);

      const newOrderId = res.data?.orderId;
      if (!newOrderId) throw new Error("주문번호가 응답에 없습니다.");

      setOrderId(newOrderId);
      setCart([]); // 주문 성공 시 장바구니 비우기
    } catch (e: any) {
      console.log("ORDER ERROR:", e);
      setOrderError(e?.message ?? "주문 생성 중 오류가 발생했습니다.");
    } finally {
      setOrdering(false);
    }
  };

  const incQty = (itemId: number) => {
    setCart((prev) =>
      prev.map((x) => (x.id === itemId ? { ...x, quantity: x.quantity + 1 } : x))
    );
  };
  
  const decQty = (itemId: number) => {
    setCart((prev) =>
      prev
        .map((x) => (x.id === itemId ? { ...x, quantity: x.quantity - 1 } : x))
        .filter((x) => x.quantity > 0) // 0 되면 자동 삭제
    );
  };
  
  const removeFromCart = (itemId: number) => {
    setCart((prev) => prev.filter((x) => x.id !== itemId));
  };

  return (
    <section className="grid gap-4 md:grid-cols-10 items-stretch">
      {/* 왼쪽: 상품목록 (6) */}
      <div className="md:col-span-6">
        <ItemList addToCart={addToCart} />
      </div>

      {/* 오른쪽: 주문 (4) */}
      <div className="md:col-span-4">
        <OrderInfo
          cart={cart}
          totalPrice={totalPrice}
          ordering={ordering}
          orderError={orderError}
          orderId={orderId}
          onOrder={handleOrder}
          onIncQty={incQty}
          onDecQty={decQty}
          onRemove={removeFromCart}
        />
      </div>
    </section>
  );
}