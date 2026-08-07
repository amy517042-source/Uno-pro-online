import CardBack from "./CardBack";

export default function OpponentSeat({
  player,
  index,
  totalPlayers,
  cardCount,
  isCurrentTurn,
}) {
  /*
   * Opponents are distributed across:
   * LEFT SIDE → TOP → RIGHT SIDE
   *
   * The local player's hand remains at the bottom.
   */

  const getSeat = () => {
    // 1 opponent
    if (totalPlayers === 1) {
      return {
        left: "50%",
        top: "10%",
        orientation: "horizontal",
      };
    }

    // 2 opponents
    if (totalPlayers === 2) {
      return index === 0
        ? {
            left: "18%",
            top: "42%",
            orientation: "vertical",
          }
        : {
            left: "82%",
            top: "42%",
            orientation: "vertical",
          };
    }

    // 3 opponents
    if (totalPlayers === 3) {
      const seats = [
        {
          left: "15%",
          top: "42%",
          orientation: "vertical",
        },
        {
          left: "50%",
          top: "10%",
          orientation: "horizontal",
        },
        {
          left: "85%",
          top: "42%",
          orientation: "vertical",
        },
      ];

      return seats[index];
    }

    /*
     * 4-9 opponents:
     * distribute them along the upper arc.
     */

    const angle =
      Math.PI -
      (Math.PI * index) / (totalPlayers - 1);

    const radiusX = 40;
    const radiusY = 35;

    const x =
      50 + Math.cos(angle) * radiusX;

    const y =
      48 - Math.sin(angle) * radiusY;

    let orientation = "horizontal";

    if (x < 30) {
      orientation = "vertical";
    }

    if (x > 70) {
      orientation = "vertical";
    }

    return {
      left: `${x}%`,
      top: `${y}%`,
      orientation,
    };
  };

  const seat = getSeat();

  const visibleCards = Math.min(cardCount, 7);
const total = totalPlayers + 1; // +1 includes yourself

let cardClass = "!w-10 !h-16 sm:!w-12 sm:!h-18";

if (total >= 4) {
  cardClass = "!w-9 !h-14 sm:!w-10 sm:!h-16";
}

if (total >= 6) {
  cardClass = "!w-8 !h-12 sm:!w-9 sm:!h-14";
}

if (total >= 8) {
  cardClass = "!w-7 !h-11 sm:!w-8 sm:!h-12";
}

if (total >= 10) {
  cardClass = "!w-6 !h-10 sm:!w-7 sm:!h-11";
}
  return (
    <div
      className="absolute z-20 flex flex-col items-center"
      style={{
        left: seat.left,
        top: seat.top,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Player name */}
      <div
        className={`
          whitespace-nowrap
          mb-1
          px-2
          py-1
          rounded-full
          text-xs
          sm:text-sm
          font-bold
          shadow-lg
          ${
            isCurrentTurn
              ? "bg-yellow-400 text-black ring-2 ring-white"
              : "bg-gray-900 text-white"
          }
        `}
      >
        {player.name} ({cardCount})
      </div>

      {/* Cards */}
      <div
        className={
          seat.orientation === "vertical"
            ? "relative w-16 h-24"
            : "relative w-24 h-16"
        }
      >
        {Array.from({
          length: visibleCards,
        }).map((_, i) => {
          const middle =
            (visibleCards - 1) / 2;

          const offset = i - middle;

          const isVertical =
            seat.orientation === "vertical";

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: isVertical
                  ? `translate(-50%, -50%)
                     translateY(${offset * 7}px)
                     rotate(90deg)`
                  : `translate(-50%, -50%)
                     translateX(${offset * 9}px)
                     rotate(${offset * 4}deg)`,

                zIndex: i,
              }}
            >
              <CardBack className={cardClass} />
            </div>
          );
        })}
      </div>
    </div>
  );
}