"use client"

import { useState } from "react";
import { apiFetch } from "@/lib/api/client";

export default function Page() {

  const [email, setEmail] = useState("");
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingList, setLoadingList] = useState(false);
  

  const handleSearch = async () => {
    if (!email.trim()) return;

    setLoadingList(true);
    setErrorMsg("")
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] p-6 gap-4 overflow-hidden">
      {/* 좌측 */}
      <div className="flex flex-col flex-1 gap-4 min-h-0">
        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-300 bg-white text-gray-700 rounded px-3 py-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="border border-gray-300 rounded px-4 py-2 bg-white hover:bg-gray-50"
          >
            검색
          </button>
        </div>
      </div>

      {/* 우측 */}
      <div className="flex-1 bg-white rounded-lg overflow-auto p-6">
        ...
      </div>
    </div>
  );
}
