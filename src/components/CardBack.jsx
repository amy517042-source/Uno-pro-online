export default function CardBack({
  className = "",
  onClick,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-16 h-24 sm:w-20 sm:h-32 rounded-xl border-2 border-white shadow-xl transition-all duration-200 ${
        disabled
          ? "opacity-70 cursor-not-allowed"
          : "hover:scale-105 hover:-translate-y-2"
      } ${className}`}
    >
      <div className="absolute inset-0 rounded-xl bg-gray-900"></div>

      <div className="absolute inset-1 rounded-lg bg-red-600 border-2 border-red-400 flex items-center justify-center">
        <span className="text-yellow-300 text-xl sm:text-2xl font-black italic -rotate-12 tracking-tight">
          UNO
        </span>
      </div>
    </button>
  );
}
