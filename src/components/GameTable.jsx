export default function GameTable({ children }) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#176d35]">

      {/* Small central UNO table */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[72vw]
          h-[72vw]
          max-w-[520px]
          max-h-[520px]
          min-w-[280px]
          min-h-[280px]
          rounded-full
          bg-[#1c7b3f]
          border-[6px]
          border-[#14592b]
          shadow-2xl
        "
      >
        {children}
      </div>

    </div>
  );
}