"use client";

import {useEffect, useRef, useState} from "react";
import {Order} from "@/lib/types/order";


export default function Page() {
    const [scale, setScale] = useState(1);
    const [orders, setOrders] = useState<Order[]>([]);
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        // 🔹 scale 계산
        const updateScale = () => {
            setScale(Math.min(window.innerWidth / 1920, 1));
        };

        updateScale();
        window.addEventListener("resize", updateScale);

        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

        console.log("API BASE:", apiBase);
        // 🔹 주문 목록 API 호출
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/orders`)
            .then((res) => res.json())
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.error("주문 목록 조회 실패", err);
            });

        return () => window.removeEventListener("resize", updateScale);
    }, []);

    //프론트에서만 무한스크롤
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleCount(prev => prev + 10);
                }
            },
            {threshold: 1}
        );

        observer.observe(loadMoreRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-screen h-screen overflow-auto flex justify-center">
            <div
                className="origin-top"
                style={{
                    width: 1920,
                    transform: `scale(${scale})`,
                }}
            >
                    <div className="self-stretch bg-[#FFE89A] px-[72px] mb-12 mx-[71px] rounded-[50px] mt-8 pt-[59px]">
                        {orders.slice(0, visibleCount).map((order) => (
                            <div
                                key={order.id}
                                className="flex flex-col items-start self-stretch bg-white mb-9"
                            >

                                <div className="flex items-start mt-1.5 mb-[13px] ml-[23px]">
                  <span className="text-black text-[40px] mr-[182px]">
                    {order.createDate.replace("T", " ").slice(0, 16)}
                  </span>
                                    <span className="text-black text-[40px]">
                    {order.email}
                  </span>
                                </div>

                                <span className="text-black text-[40px] w-[400px] mb-5 ml-[23px] whitespace-pre-line">
                  {order.items
                      .map(
                          (item) =>
                              `${item.itemName} ${item.quantity}`
                      )
                      .join("\n")}
                </span>
                            </div>
                        ))}
                        {/* 무한 스크롤 트리거 */}
                        <div ref={loadMoreRef} className="h-10" />
                    </div>
                </div>
            </div>

    );
}
