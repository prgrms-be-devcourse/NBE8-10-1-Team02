"use client";

import { useEffect, useState } from "react";

type OrderItem = {
    id: number;
    itemId: number;
    itemName: string;
    price: number;
    quantity: number;
};

type Order = {
    id: number;
    createDate: string;
    email: string;
    items: OrderItem[];
};

export default function Page() {
    const [scale, setScale] = useState(1);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        // 🔹 scale 계산
        const updateScale = () => {
            setScale(Math.min(window.innerWidth / 1920, 1));
        };

        updateScale();
        window.addEventListener("resize", updateScale);

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

    return (
        <div className="w-screen h-screen overflow-hidden flex justify-center">
            <div
                className="origin-top"
                style={{
                    width: 1920,
                    transform: `scale(${scale})`,
                }}
            >
                <div className="flex flex-col items-start bg-[#1A1A1A] w-[1920px]">

                    <div className="flex items-start mb-0.5 ml-[325px] gap-3.5">
            <span className="font-holtwood text-[#FFB922] text-[90px]">
              Super Coffee Mario
            </span>
                        <span className="text-[#A0A0A0] text-[50px] font-bold mt-[72px]">
              manager
            </span>
                    </div>


                    <div className="self-stretch bg-[#FFE89A] px-[72px] mb-12 mx-[71px] rounded-[50px]">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="flex flex-col items-start self-stretch bg-white mt-[59px] mb-9"
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
                    </div>
                </div>
            </div>
        </div>
    );
}
