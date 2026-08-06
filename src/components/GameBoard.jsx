export default function GameBoard({ children }) {
  return (
    <div className="relative w-full h-screen bg-[#146b2e] overflow-hidden">

      {/* Felt table */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2

          w-[94vw]
          h-[80vh]

          max-w-[1100px]
          max-h-[700px]

          rounded-[80px]

          border-[10px]
          border-[#0b5b25]

          bg-[#1f7a36]

          shadow-[0_0_40px_rgba(0,0,0,0.35)]
        "
      >
        {children}
      </div>

    </div>
  );
      }
