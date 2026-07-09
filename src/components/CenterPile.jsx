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
    <div className="flex items-center justify-center gap-8">

      {/* Draw Deck */}
      <div className="flex flex-col items-center">
        <CardBack
          onClick={onDraw}
          disabled={!canDraw}
        />

        <p className="mt-2 text-white font-bold">
          Draw ({deckCount})
        </p>
      </div>

      {/* Discard Pile */}
      <div className="flex flex-col items-center">
        {topCard ? (
          <UnoCard
            card={topCard}
            disabled
          />
        ) : (
          <div className="w-20 h-32 rounded-xl border-2 border-dashed border-white"></div>
        )}

        <p className="mt-2 text-white font-bold">
          Color: {currentColor}
        </p>
      </div>

    </div>
  );
}
