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

        {/* ONLY DISCARD PILE HAS THE CIRCLE */}
        <div
          className="
            relative
            w-32 h-32
            sm:w-40 sm:h-40
            rounded-full
            border-4
            border-[#14592b]
            bg-[#1c7b3f]
            shadow-inner
            flex
            items-center
            justify-center
          "
        >

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
              className="w-16 h-24 sm:w-20 sm:h-32"
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

        </div>

        {/* Active colour BELOW circle */}
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