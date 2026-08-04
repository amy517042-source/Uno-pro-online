import CardBack from "./CardBack";

export default function OpponentHand({
  player,
  index,
  totalPlayers,
  cardCount,
  isCurrentTurn,
}) {
  const positions = [
    { top: "8%", left: "50%", transform: "translateX(-50%)" },   // Top
    { top: "30%", left: "12%" },                                 // Left
    { top: "30%", right: "12%" },                                // Right
    { top: "55%", left: "8%" },                                  // Bottom Left
    { top: "55%", right: "8%" },                                 // Bottom Right
    { top: "12%", left: "20%" },                                 // Top Left
    { top: "12%", right: "20%" },                                // Top Right
    { top: "45%", left: "3%" },                                  // Far Left
    { top: "45%", right: "3%" },                                 // Far Right
  ];

  const pos = positions[index % positions.length];

  return (
    <div className="absolute" style={pos}>
      <div className="flex flex-col items-center">
        <div
          className={`mb-2 px-3 py-1 rounded-full font-bold ${
            isCurrentTurn
              ? "bg-yellow-400 text-black"
              : "bg-gray-800 text-white"
          }`}
        >
          {player.name} ({cardCount})
        </div>

        <CardBack />
      </div>
    </div>
  );
}