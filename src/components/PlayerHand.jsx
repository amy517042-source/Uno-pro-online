import UnoCard from "./UnoCard";

export default function PlayerHand({
  cards = [],
  onCardClick,
  canPlay = false,
}) {
  return (
    <div className="w-full flex justify-center items-end gap-2 overflow-x-auto py-4 px-2">
      {cards.map((card, index) => (
        <UnoCard
          key={`${card.id}-${index}`}
          card={card}
          disabled={!canPlay}
          onClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
}
