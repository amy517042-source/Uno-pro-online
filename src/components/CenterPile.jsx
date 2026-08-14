import CardBack from "./CardBack";
import UnoCard from "./UnoCard";

export default function CenterPile({
  topCard,
  currentColor,
  deckCount,
  onDraw,
  canDraw,
}) {
  const activeColor =
    currentColor || topCard?.color || "";

  return (
    <div className="flex items-center justify-center gap-5 sm:gap-8">

      {/* ================= DRAW PILE ================= */}
      <div className="flex flex-col items-center">
        <CardBack
          onClick={onDraw}
          disabled={!canDraw}
          className="w-16 h-24 sm:w-20 sm:h-32"
        />

        <p className="mt-2 text-white font-bold text-sm sm:text-base whitespace-nowrap">
          Draw ({deckCount})
        </p>
      </div>


      {/* ================= DISCARD PILE ================= */}
      <div className="flex flex-col items-center">

        {/* NO CIRCLE HERE */}
        {topCard ? (
          <UnoCard
            card={
              topCard.color === "Black"
                ? {
                    ...topCard,
                    color: activeColor || "Black",
                  }
                : topCard
            }
            disabled
          />
        ) : (
          <div
            className="
              w-16 h-24
              sm:w-20 sm:h-32
              rounded-xl
              border-2
              border-dashed
              border-white/60
            "
          />
        )}

        {/* Active Colour */}
        <p
          className={`
            mt-2
            text-sm
            sm:text-base
            font-bold
            whitespace-nowrap
            ${
              activeColor === "Red"
                ? "text-red-500"
                : activeColor === "Blue"
                ? "text-blue-500"
                : activeColor === "Green"
                ? "text-green-400"
                : activeColor === "Yellow"
                ? "text-yellow-300"
                : "text-white"
            }
          `}
        >
          {activeColor
            ? `Active Colour: ${activeColor}`
            : ""}
        </p>

      </div>

    </div>
  );
}