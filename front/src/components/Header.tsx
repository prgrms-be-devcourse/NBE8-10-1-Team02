"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // 메인 페이지("/")에서는 헤더를 숨김
  if (pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-b-red-500 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">커피팔아요</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/order"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              주문
            </Link>
            <Link
              href="/orders"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              주문 목록
            </Link>
            <Link
              href="/admin"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              관리자
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

