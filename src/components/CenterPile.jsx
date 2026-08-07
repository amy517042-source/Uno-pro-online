import CardBack from "./CardBack";
import UnoCard from "./UnoCard";

export default function CenterPile({
  topCard,
  currentColor,
  deckCount,
  onDraw,
  canDraw,
}) {
  return (
    <div className="flex items-center justify-center gap-5">

      {/* DRAW DECK */}
      <div className="flex flex-col items-center">
        <CardBack
          onClick={onDraw}
          disabled={!canDraw}
          className="w-14 h-20 sm:w-16 sm:h-24"
        />

        <p className="mt-1 text-white text-sm font-bold">
          Draw ({deckCount})
        </p>
      </div>

      {/* DISCARD PILE + SMALL CIRCLE */}
      <div className="relative flex items-center justify-center">

        {/* ONLY DISCARD PILE CIRCLE */}
        <div
          className="
            absolute
            w-32 h-32
            sm:w-40 sm:h-40
            rounded-full
            border-4
            border-[#14592b]
            bg-[#1c7b3f]
            shadow-inner
          "
        />

        {/* DISCARD CARD */}
        <div className="relative z-10 flex flex-col items-center">

          {topCard ? (
            <UnoCard
              card={
                topCard.color === "Black"
                  ? {
                      ...topCard,
                      color: currentColor || "Black",
                    }
                  : topCard
              }
              disabled
              className="w-14 h-20 sm:w-16 sm:h-24"
            />
          ) : (
            <div className="w-14 h-20 sm:w-16 sm:h-24 rounded-xl border-2 border-dashed border-white" />
          )}

          <p
            className={`
              mt-1
              text-xs
              sm:text-sm
              font-bold
              whitespace-nowrap
              ${
                currentColor === "Red"
                  ? "text-red-400"
                  : currentColor === "Blue"
                  ? "text-blue-400"
                  : currentColor === "Green"
                  ? "text-green-300"
                  : currentColor === "Yellow"
                  ? "text-yellow-300"
                  : "text-white"
              }
            `}
          >
            {currentColor}
          </p>

        </div>
      </div>

    </div>
  );
}