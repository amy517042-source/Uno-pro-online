import { displayValue, getColorClass } from "../game/helpers";

export default function UnoCard({
  card,
  onClick,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-16 h-24 sm:w-20 sm:h-32 rounded-xl border-2 border-white shadow-xl transition-all duration-200
      ${
        disabled
          ? "opacity-60 cursor-not-allowed"
          : "hover:scale-110 hover:-translate-y-2"
      }`}
    >
      <div
        className={`absolute inset-0 rounded-xl ${getColorClass(card.color)}`}
      ></div>

      <div className="relative flex flex-col justify-between h-full p-2">
        <span className="text-xs font-bold">
          {displayValue(card.value)}
        </span>

        <div className="flex-1 flex items-center justify-center text-2xl font-black">
          {displayValue(card.value)}
        </div>

        <span className="text-xs font-bold rotate-180">
          {displayValue(card.value)}
        </span>
      </div>
    </button>
  );
}
