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
    <div
      className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        z-30
        flex
        items-center
        gap-3
        sm:gap-5
      "
    >

      {/* DRAW PILE */}
      <div className="flex flex-col items-center">
        <CardBack
          onClick={onDraw}
          disabled={!canDraw}
          className="
            !w-14 !h-22
            sm:!w-16 sm:!h-24
          "
        />

        <span className="mt-1 text-white text-xs sm:text-sm font-bold whitespace-nowrap">
          Draw ({deckCount})
        </span>
      </div>

      {/* DISCARD CIRCLE */}
      <div
        className="
          relative
          w-28 h-28
          sm:w-36 sm:h-36
          rounded-full
          border-2
          border-white/20
          bg-black/5
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
                    color: currentColor || "Black",
                  }
                : topCard
            }
            disabled
          />
        ) : (
          <div
            className="
              w-14 h-20
              sm:w-16 sm:h-24
              rounded-xl
              border-2
              border-dashed
              border-white/40
            "
          />
        )}

        {/* ACTIVE COLOR */}
        {currentColor && (
          <div
            className={`
              absolute
              -bottom-7
              left-1/2
              -translate-x-1/2
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
          </div>
        )}
      </div>
    </div>
  );
}