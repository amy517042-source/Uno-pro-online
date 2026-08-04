import CardBack from "./CardBack";

export default function OpponentHand({
  player,
  index,
  totalPlayers,
  cardCount = 0,
  isCurrentTurn = false,
}) {
  // Spread players evenly around the table
  const angle =
    ((index * 360) / totalPlayers - 90) *
    (Math.PI / 180);

  // Responsive radius
  const radius =
    window.innerWidth < 768 ? 34 : 40;

  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <div
      className={`absolute transition-all duration-300 ${
        isCurrentTurn ? "scale-110" : ""
      }`}
      style={{
        left: `${50 + x}%`,
        top: `${50 + y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="flex flex-col items-center">

        <div
          className={`mb-2 px-3 py-1 rounded-full text-sm font-bold ${
            isCurrentTurn
              ? "bg-yellow-400 text-black"
              : "bg-gray-800 text-white"
          }`}
        >
          {player.name} ({cardCount})
        </div>

        <div className="flex -space-x-6">
          {Array.from({
            length: Math.min(cardCount, 7),
          }).map((_, i) => (
            <div
              key={i}
              style={{
                transform: `rotate(${(i - 3) * 5}deg)`,
                zIndex: i,
              }}
            >
              <CardBack />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}