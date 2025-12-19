"use client";

type Props = {
  email: string;
  setEmail: (v: string) => void;
  onSearch: () => void;
  disabled?: boolean;
  errorMsg?: string;
};

export default function OrdersSearchBar({
  email,
  setEmail,
  onSearch,
  disabled,
  errorMsg,
}: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled) {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex justify-center gap-2">
        <input
          className={`fw-80 rounded-xl bg-neutral-200 px-4 py-2 text-gray-600 placeholder:text-neutral-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-amber-300 disabled:bg-gray-100 disabled:cursor-not-allowed ${errorMsg ? "border-2 border-red-500" : ""}`}
          style={{ fontFamily: '"Holtwood One SC", serif' }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
          disabled={disabled}
          aria-label="이메일 주소 입력"
          aria-invalid={!!errorMsg}
          aria-describedby={errorMsg ? "email-error" : undefined}
        />
        <button
          type="submit"
          className="rounded-full bg-[#A7A7A7] px-6 py-2 font-bold shadow-sm hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-[#000000] transition-all duration-200"
          style={{ fontFamily: '"Holtwood One SC", serif' }}
          disabled={disabled}
          aria-label="주문 검색"
        >
          Search
        </button>
      </form>
      {errorMsg && (
        <div 
          id="email-error"
          className="rounded-xl border-2 border-red-300 bg-red-50/95 p-3 text-red-700 text-sm font-medium shadow-[0_4px_12px_rgba(239,68,68,0.15)]"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-red-500 text-base">⚠</span>
            <span>{errorMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
}