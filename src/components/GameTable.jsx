export default function GameTable({ children }) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#176d35]">

      {/* Table */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[92vw]
          h-[80vh]
          max-w-[900px]
          max-h-[700px]
          rounded-full
          border-8
          border-[#14592b]
          bg-[#1c7b3f]
          shadow-2xl
        "
      >
        {children}
      </div>

    </div>
  );
}