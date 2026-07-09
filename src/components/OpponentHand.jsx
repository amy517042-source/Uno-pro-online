import CardBack from "./CardBack";

export default function OpponentHand({
  playerName,
  cardCount = 0,
  isCurrentTurn = false,
}) {
  return (
    <div
      className={`flex flex-col items-center transition-all duration-300 ${
        isCurrentTurn ? "scale-110" : ""
      }`}
    >
      <div
        className={`mb-2 px-3 py-1 rounded-full text-sm font-bold ${
          isCurrentTurn
            ? "bg-yellow-400 text-black"
            : "bg-gray-800 text-white"
        }`}
      >
        {playerName} ({cardCount})
      </div>

      <div className="flex -space-x-10">
        {Array.from({ length: Math.min(cardCount, 7) }).map((_, index) => (
          <div
            key={index}
            style={{
              transform: `rotate(${(index - 3) * 5}deg)`,
              zIndex: index,
            }}
          >
            <CardBack />
          </div>
        ))}
      </div>
    </div>
  );
                                       }
