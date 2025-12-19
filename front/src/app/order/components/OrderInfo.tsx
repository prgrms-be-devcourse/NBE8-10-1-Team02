"use client";

import { CartItem } from "@/lib/types/item";
import Cart from "./Cart";
import { useState } from "react";


export default function OrderInfo({
  cart,
  totalPrice,
  ordering,
  orderError,
  orderId,
  onOrder,
  onIncQty,
  onDecQty,
  onRemove,
}: {
  cart: CartItem[];
  totalPrice: number;
  ordering: boolean;
  orderError: string | null;
  orderId: number | null;
  onOrder: (form: { email: string; address: string; postcode: string }) => Promise<void>;
  onIncQty: (itemId: number) => void;
  onDecQty: (itemId: number) => void;
  onRemove: (itemId: number) => void;
}) {

  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");

  return (
    <div className="h-full rounded-2xl border p-4 bg-[#FFE89A] flex flex-col">
      <Cart
        cart={cart}
        onIncQty={onIncQty}
        onDecQty={onDecQty}
        onRemove={onRemove}
        disabled={ordering}
      />
      <div className="mb-3 text-sm font-medium text-black">주문 정보</div>

        {/* 위쪽 폼 영역 */}
        <div className="space-y-3">
          <input
            className="w-full rounded-xl text-black px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-black"
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={ordering}
          />
          <input
            className="w-full rounded-xl text-black px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-black"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={ordering}
          />
          <input
            className="w-full rounded-xl text-black px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-black"
            placeholder="zipcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            disabled={ordering}
          />

          <div className="rounded-xl px-1 py-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-black">total</span>
              <span className="font-semibold text-black">{totalPrice.toLocaleString()} won</span>
            </div>
          </div>

          {/* 상태 메시지 */}
          {orderError && (
            <div className="rounded-xl bg-white/70 p-2 text-sm text-red-700">
              {orderError}
            </div>
          )}
          {orderId && (
            <div className="rounded-xl bg-white/70 p-2 text-sm text-green-700">
              주문이 생성되었습니다. 주문번호: <b>{orderId}</b>
            </div>
          )}
        </div>

        <div className="w-full px-1 py-2">
          <div className="flex items-center justify-between text-sm text-black">
            <span>당일 오후 2시 이후의 주문은 다음날 배송을 시작합니다.</span>
          </div>
        </div>
      
      <button
        onClick={() => onOrder({ email, address, postcode })}
        disabled={ordering}
        className="mt-auto w-full rounded-xl bg-[#FFB923] py-2 text-xl text-black font-bold hover:opacity-90">
        {ordering ? "ORDERING..." : "ORDER NOW"}
      </button>
    </div>
  );
}