"use client";

import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="bg-[#1a1a1a] w-full min-h-screen flex items-center justify-center p-10 overflow-auto">
      
      <div className="w-fit flex flex-col">
        <div className="flex flex-wrap md:flex-nowrap items-end gap-16 md:gap-24">
          <h1 
            className="text-[#ffb923] text-[clamp(60px,8vw,140px)] leading-[0.85] uppercase tracking-tighter select-none"
            style={{ fontFamily: '"Holtwood One SC", serif' }}
          >
            Super<br />
            Coffee<br />
            Mario
          </h1>

          <div className="flex flex-col gap-5 mb-3">
            
            <Link 
              href="/order"
              className="w-[280px] md:w-[320px] py-5 bg-[#ffb923] rounded-[100px] hover:bg-[#ffa500] transition-all transform hover:scale-105 active:scale-95 shadow-xl flex justify-center items-center cursor-pointer"
            >
              <span className="font-sans font-black text-black text-[28px] md:text-[36px] leading-none whitespace-nowrap">
                order now
              </span>
            </Link>

            <Link 
              href="/orders"
              className="w-[280px] md:w-[320px] py-5 bg-[#ffe89a] rounded-[100px] hover:bg-[#ffd966] transition-all transform hover:scale-105 active:scale-95 shadow-xl flex justify-center items-center cursor-pointer"
            >
              <span className="font-sans font-black text-black text-[28px] md:text-[36px] leading-none whitespace-nowrap">
                my order
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-6 flex justify-start">
           <Link 
             href="/admin"
             className="px-10 py-3 bg-[#3f3f3f] rounded-full hover:bg-[#4f4f4f] transition-all transform hover:scale-105 active:scale-95 shadow-md flex justify-center items-center cursor-pointer"
           >
              <span className="font-sans font-black text-[#a0a0a0] text-[20px] md:text-[24px] tracking-wide">
                manager
              </span>
           </Link>
        </div>

      </div>
    </main>
  );
}
