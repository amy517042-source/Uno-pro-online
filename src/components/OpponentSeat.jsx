import CardBack from "./CardBack";

export default function OpponentSeat({
  player,
  cardCount,
  style,
  isCurrentTurn,
}) {
  return (
    <div
      style={style}
      className="absolute flex flex-col items-center"
    >
      <div
        className={`mb-2 px-3 py-1 rounded-full font-bold text-white ${
          isCurrentTurn
            ? "bg-yellow-500"
            : "bg-gray-800"
        }`}
      >
        {player.name} ({cardCount})
      </div>

      <div className="relative w-24 h-16">

        {Array.from({
          length: Math.min(cardCount, 7),
        }).map((_, i) => (

          <div
            key={i}
            className="absolute"
            style={{
              left: `${i * 8}px`,
              transform: `rotate(${(i - 3) * 6}deg)`,
            }}
          >
            <CardBack className="w-10 h-16" />
          </div>

        ))}

      </div>
    </div>
  );
}