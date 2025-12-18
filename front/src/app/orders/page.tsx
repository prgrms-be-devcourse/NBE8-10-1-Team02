"use client";

import { useState } from "react";

//주문내역 조회(이메일) 화면
export default function Page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] p-6 gap-4 overflow-hidden">
        {/*왼쪽 영역: 이메일 입력 + 주문내역(노랑)*/}
        <div className="flex flex-col flex-1 gap-4 min-h-0">
          {/*이메일 검색 입력*/}
          <div className="flex gap-2">
            <input className="flex border border-gray-300 bg-white text-gray-600" type="email" value={email} placeholder="이메일을 입력하세요"/>
            <button className="flex border border-gray-300">검색</button>
          </div>
          {/*서브 컨텐츠 : 왼쪽 주문내역(노랑)*/}
          <div className="flex-1 bg-yellow-400 rounded-lg overflow-auto">
          </div>
        </div>

        {/*오른쪽 영역: 주문 상세(흰색) - 이메일 입력 높이부터 시작*/}
        <div className="flex-1 bg-white rounded-lg overflow-auto"></div>
      </div>
    </>
  );
  
}