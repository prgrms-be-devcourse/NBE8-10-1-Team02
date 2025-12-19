"use client";

import BodySection from "./components/BodySection";

//상품목록과 주문 화면
export default function Page() {
  return (
    <div className="min-h-[calc(100dvh-80px)] flex items-center">
      <div className="mx-auto w-full max-w-6xl px-6">
        <BodySection/>
      </div>
    </div>
  );
  
}