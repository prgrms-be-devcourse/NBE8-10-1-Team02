"use client";

import { useEffect, useRef, useState } from "react";
import { Order } from "@/lib/types/order";
import ItemList from "@/app/order/components/ItemList";
import { useRouter } from "next/navigation";


export default function Page() {
    const [scale, setScale] = useState(1);
    const [orders, setOrders] = useState<Order[]>([]);
    const [visibleCount, setVisibleCount] = useState(10);
    const router = useRouter();

    // 🔹 상품 추가 모달 관련 state
    const [isOpen, setIsOpen] = useState(false);
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        const updateScale = () => {
            setScale(Math.min(window.innerWidth / 1920, 1));
        };

        updateScale();
        window.addEventListener("resize", updateScale);

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/orders`)
            .then((res) => res.json())
            .then((res) => setOrders(res.data))
            .catch((err) => console.error("주문 목록 조회 실패", err));

        return () => window.removeEventListener("resize", updateScale);
    }, []);

    // 🔹 프론트 무한 스크롤
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleCount((prev) => prev + 10);
                }
            },
            { threshold: 1 }
        );

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, []);

    function addToCart() {
        // 수정 버튼용 (현재 비워둠)
    }

    // 🔹 상품 추가 API
    async function createItem() {
        if (!itemName || !price) {
            alert("상품명과 가격은 필수입니다.");
            return;
        }

        const formData = new FormData();
        formData.append("itemName", itemName);
        formData.append("price", price);
        if (image) formData.append("image", image);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/items`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            //alert(data.message);

// 🔥 핵심
            setIsOpen(false);
            router.refresh(); // 현재 페이지 리프레시

            // 초기화
            setItemName("");
            setPrice("");
            setImage(null);
            setIsOpen(false);


        } catch (e) {
            console.error(e);
            alert("상품 등록 실패");
        }
    }

    return (
        <div className="w-screen h-screen overflow-auto flex justify-center">
            <div
                className="origin-top"
                style={{
                    width: 1920,
                    transform: `scale(${scale})`,
                }}
            >
                <div className="self-stretch bg-[#IAIAIA] px-[72px] mb-12 mx-[71px] rounded-[50px] mt-8 pt-[59px]">
                    <section className="grid gap-4 md:grid-cols-10 items-stretch">
                        {/* 왼쪽: 상품목록 */}
                        <div className="md:col-span-6">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="mb-4 rounded-lg border px-4 py-2 text-sm hover:bg-white hover:text-black"
                            >
                                + 상품 추가
                            </button>

                            <ItemList addToCart={addToCart} buttonName="수정" />
                        </div>
                    </section>

                    {/* 무한 스크롤 트리거 */}
                    <div ref={loadMoreRef} className="h-10" />
                </div>
            </div>

            {/* 🔹 상품 추가 모달 */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-[400px] rounded-xl bg-white p-6">
                        <h2 className="mb-4 text-xl font-bold">상품 추가</h2>

                        <input
                            type="text"
                            placeholder="상품 이름"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className="mb-3 w-full rounded border px-3 py-2"
                        />

                        <input
                            type="number"
                            placeholder="상품 가격"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mb-3 w-full rounded border px-3 py-2"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                            className="mb-4 w-full"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded border px-4 py-2"
                            >
                                취소
                            </button>
                            <button
                                onClick={createItem}
                                className="rounded bg-black px-4 py-2 text-white"
                            >
                                등록
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
