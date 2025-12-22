// src/app/orders/page.tsx
"use client";

import { useState, useCallback, useMemo } from "react";
import type { OrderDto, OrderDetailResDto, OrderUpdateReqDto } from "@/lib/types/order";
import { fetchOrdersByEmail, fetchOrderDetail, updateOrder, deleteOrder } from "@/lib/api/orders";
import { parseErrorMessages } from "./utils/errorUtils";
import { canModifyOrder } from "./utils/orderTimeUtils";

import OrdersSearchBar from "./components/OrderSearchBar"
import OrdersListPanel from "./components/OrdersListPanel"
import OrderDetailForm from "./components/OrderDetailForm"

export default function Page() {
  // 검색
  const [email, setEmail] = useState("");
  const [loadingList, setLoadingList] = useState(false);
  const [searchErrorMsg, setSearchErrorMsg] = useState("");

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
  const [errorMsg, setErrorMsg] = useState<string[]>([]);

  // 이메일 형식 검증 (메모이제이션)
  const isValidEmail = useCallback((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const loadDetail = useCallback(async (orderId: number) => {
    setLoadingDetail(true);
    setErrorMsg([]);

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
      setErrorMsg(parseErrorMessages(e || { msg: "주문 상세 조회 실패" }));
    } finally {
      setLoadingDetail(false);
    }
  }, []);

  const handleSearch = useCallback(async () => {
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      setSearchErrorMsg("이메일을 입력해주세요");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setSearchErrorMsg("올바른 이메일 형식을 입력해주세요");
      return;
    }

    setLoadingList(true);
    setErrorMsg([]);
    setSearchErrorMsg("");

    try {
      const res = await fetchOrdersByEmail(trimmedEmail);
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
      const errors = parseErrorMessages(e || { msg: "주문 목록 조회 실패" });
      setSearchErrorMsg(errors.length > 0 ? errors[0] : "주문 목록을 불러오는데 실패했습니다");
    } finally {
      setLoadingList(false);
    }
  }, [email, isValidEmail, loadDetail]);

  const handleSelect = useCallback(async (orderId: number) => {
    if (selectedOrderId === orderId) return; // 이미 선택된 경우 중복 호출 방지
    setSelectedOrderId(orderId);
    await loadDetail(orderId);
  }, [selectedOrderId, loadDetail]);

  const handleSave = useCallback(async () => {
    if (!selectedOrderId || !form || !detail) return;

    // 주문 수정 가능 시간 체크
    if (!canModifyOrder(detail.createDate)) {
      setErrorMsg(["주문 수정 기한이 만료되었습니다. 다음날 14시 이후에는 주문을 수정할 수 없습니다."]);
      return;
    }

    setSaving(true);
    setErrorMsg([]);

    try {
      const updateRes = await updateOrder(selectedOrderId, form);
      await loadDetail(updateRes.data.orderId);
      // 업데이트 후 왼쪽 목록도 갱신
      const trimmedEmail = email.trim();
      if (trimmedEmail) {
        const listRes = await fetchOrdersByEmail(trimmedEmail);
        const list = listRes.data ?? [];
        setOrders(list);
      }
    } catch (e: any) {
      setErrorMsg(parseErrorMessages(e || { msg: "주문 수정 실패" }));
    } finally {
      setSaving(false);
    }
  }, [selectedOrderId, form, email, loadDetail, detail]);

  const handleRollback = useCallback(() => {
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
    setErrorMsg([]);
  }, [detail]);

  const handleDeleteAll = useCallback(async () => {
    if (!selectedOrderId || !form || !detail || !email.trim()) return;

    // 주문 수정 가능 시간 체크
    if (!canModifyOrder(detail.createDate)) {
      setErrorMsg(["주문 삭제 기한이 만료되었습니다. 다음날 14시 이후에는 주문을 삭제할 수 없습니다."]);
      return;
    }

    // 확인 알림
    const confirmed = window.confirm(
      `주문번호 ${selectedOrderId}번을 정말로 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`
    );
    if (!confirmed) return;

    setSaving(true);
    setErrorMsg([]);

    try {
      await deleteOrder(selectedOrderId);
      await handleSearch();
    } catch (e: any) {
      setErrorMsg(parseErrorMessages(e || { msg: "주문 삭제 실패" }));
    } finally {
      setSaving(false);
    }
  }, [selectedOrderId, form, detail, email, handleSearch]);

  const handleEmailChange = useCallback((v: string) => {
    setEmail(v);
    if (searchErrorMsg) setSearchErrorMsg("");
  }, [searchErrorMsg]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] p-4 md:p-6 gap-4 overflow-hidden bg-[#1a1a1a]">
      {/* 좌측 */}
      <div className="flex flex-col flex-1 gap-4 min-h-0 min-w-0">
        <OrdersSearchBar
          email={email}
          setEmail={handleEmailChange}
          onSearch={handleSearch}
          disabled={loadingList || loadingDetail}
          errorMsg={searchErrorMsg}
        />
        <OrdersListPanel 
          orders={orders} 
          loading={loadingList} 
          selectedOrderId={selectedOrderId}
          onSelect={handleSelect} 
        />
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
        onDeleteAll={handleDeleteAll}
      />
    </div>
  );
}