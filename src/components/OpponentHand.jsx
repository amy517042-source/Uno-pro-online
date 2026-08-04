import CardBack from "./CardBack";

export default function OpponentHand({
  player,
  index,
  totalPlayers,
  cardCount,
  isCurrentTurn,
}) {
  const radius = 220;

  const angle =
    (360 / totalPlayers) * index - 90;

  const x =
    Math.cos((angle * Math.PI) / 180) * radius;

  const y =
    Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
      }}
    >
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