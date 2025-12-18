"use client";

type Props = {
  email: string;
  setEmail: (v: string) => void;
  onSearch: () => void;
  disabled?: boolean;
};

export default function OrdersSearchBar({
  email,
  setEmail,
  onSearch,
  disabled,
}: Props) {
  return (
    <div className="flex justify-center gap-2">
      <input
        className="fw-80 rounded-xl bg-neutral-200 px-4 py-2 text-gray-600 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-amber-300"
        style={{ fontFamily: '"Holtwood One SC", serif' }}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일을 입력하세요"
        disabled={disabled}
      />
      <button
        type="button"
        onClick={onSearch}
        className="rounded-full bg-[#A7A7A7] px-6 py-2 font-bold shadow-sm hover:bg-neutral-100 active:scale-[0.99]  text-[#000000] "
        style={{ fontFamily: '"Holtwood One SC", serif' }}
        disabled={disabled}
      >
        Search
      </button>
    </div>
  );
}