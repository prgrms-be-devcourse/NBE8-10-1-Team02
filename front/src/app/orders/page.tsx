// src/app/orders/page.tsx
"use client";

import { useState } from "react";
import type { OrderDto, OrderDetailResDto, OrderUpdateReqDto } from "@/lib/types/order";
import { fetchOrdersByEmail, fetchOrderDetail, updateOrder } from "@/lib/api/orders";

import OrdersSearchBar from "./components/OrderSearchBar"
import OrdersListPanel from "./components/OrdersListPanel"
import OrderDetailForm from "./components/OrderDetailForm"

export default function Page() {
  // 검색
  const [email, setEmail] = useState("");
  const [loadingList, setLoadingList] = useState(false);

  // 목록
  const [orders, setOrders] = useState<OrderDto[]>([]);

  // 선택/상세
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [detail, setDetail] = useState<OrderDetailResDto | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // 수정 폼
  const [form, setForm] = useState<OrderUpdateReqDto | null>(null);
  const [saving, setSaving] = useState(false);

  // 에러
  const [errorMsg, setErrorMsg] = useState("");

  const loadDetail = async (orderId: number) => {
    setLoadingDetail(true);
    setErrorMsg("");

    try {
      const d = await fetchOrderDetail(orderId);
      setDetail(d);

      setForm({
        email: d.email,
        address: d.address,
        postcode: d.postcode,
        orderItems: d.orderItems.map((it) => ({
          itemId: it.itemId,
          quantity: it.quantity,
        })),
      });
    } catch (e: any) {
      setDetail(null);
      setForm(null);
      setErrorMsg(e?.msg || e?.message || "주문 상세 조회 실패");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleSearch = async () => {
    if (!email.trim()) return;

    setLoadingList(true);
    setErrorMsg("");

    try {
      const res = await fetchOrdersByEmail(email);
      const list = res.data ?? [];

      setOrders(list);

      if (list.length > 0) {
        const firstId = list[0].id;
        setSelectedOrderId(firstId);
        await loadDetail(firstId);
      } else {
        setSelectedOrderId(null);
        setDetail(null);
        setForm(null);
      }
    } catch (e: any) {
      setOrders([]);
      setSelectedOrderId(null);
      setDetail(null);
      setForm(null);
      setErrorMsg(e?.msg || e?.message || "주문 목록 조회 실패");
    } finally {
      setLoadingList(false);
    }
  };

  const handleSelect = async (orderId: number) => {
    setSelectedOrderId(orderId);
    await loadDetail(orderId);
  };

  const handleSave = async () => {
    if (!selectedOrderId || !form) return;

    setSaving(true);
    setErrorMsg("");

    try {
      const res = await updateOrder(selectedOrderId, form);
      await loadDetail(res.data.orderId);
    } catch (e: any) {
      setErrorMsg(e?.msg || e?.message || "주문 수정 실패");
    } finally {
      setSaving(false);
    }
  };

  const handleRollback = () => {
    if (!detail) return;

    setForm({
      email: detail.email,
      address: detail.address,
      postcode: detail.postcode,
      orderItems: detail.orderItems.map((it) => ({
        itemId: it.itemId,
        quantity: it.quantity,
      })),
    });
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] p-6 gap-4 overflow-hidden">
      {/* 좌측 */}
      <div className="flex flex-col flex-1 gap-4 min-h-0">
        <OrdersSearchBar
          email={email}
          setEmail={setEmail}
          onSearch={handleSearch}
          disabled={loadingList}
        />
        <OrdersListPanel orders={orders} loading={loadingList} onSelect={handleSelect} />
      </div>

      {/* 우측 */}
      <OrderDetailForm
        selectedOrderId={selectedOrderId}
        loading={loadingDetail}
        detail={detail}
        form={form}
        setForm={(next) => setForm(next)}
        saving={saving}
        errorMsg={errorMsg}
        onRollback={handleRollback}
        onSave={handleSave}
      />
    </div>
  );
}