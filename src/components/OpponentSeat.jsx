import CardBack from "./CardBack";

export default function OpponentSeat({
  player,
  index,
  totalPlayers,
  cardCount,
  isCurrentTurn,
}) {
  /*
   * Position players around the CENTER CIRCLE.
   *
   * The center of the screen is reserved for:
   *     Draw pile + Discard pile
   *
   * Opponents stay outside that area.
   */

  const getSeat = () => {
    // -------------------------
    // 1 OPPONENT
    // -------------------------
    if (totalPlayers === 1) {
      return {
        left: "50%",
        top: "12%",
        rotate: 0,
      };
    }

    // -------------------------
    // 2 OPPONENTS
    // -------------------------
    if (totalPlayers === 2) {
      return index === 0
        ? {
            left: "13%",
            top: "42%",
            rotate: -90,
          }
        : {
            left: "87%",
            top: "42%",
            rotate: 90,
          };
    }

    // -------------------------
    // 3 OPPONENTS
    // -------------------------
    if (totalPlayers === 3) {
      const seats = [
        {
          left: "14%",
          top: "40%",
          rotate: -90,
        },
        {
          left: "50%",
          top: "10%",
          rotate: 0,
        },
        {
          left: "86%",
          top: "40%",
          rotate: 90,
        },
      ];

      return seats[index];
    }

    // -------------------------
    // 4–10 OPPONENTS
    // -------------------------
    //
    // Spread players around the
    // upper 240° arc.
    //

    const startAngle = -150;
    const endAngle = -30;

    const angle =
      startAngle +
      ((endAngle - startAngle) * index) /
        (totalPlayers - 1);

    const radians = angle * (Math.PI / 180);

    /*
     * Keep players far enough away
     * from the center circle.
     */
    const radiusX = 43;
    const radiusY = 40;

    const x =
      50 + Math.cos(radians) * radiusX;

    const y =
      50 + Math.sin(radians) * radiusY;

    let rotate = 0;

    // Left side
    if (x < 35) {
      rotate = -90;
    }

    // Right side
    else if (x > 65) {
      rotate = 90;
    }

    return {
      left: `${x}%`,
      top: `${y}%`,
      rotate,
    };
  };

  const seat = getSeat();

  /*
   * Don't render all 20+ card backs.
   * Five gives enough visual information
   * while keeping the UI clean.
   */
  const visibleCards = Math.min(cardCount, 5);

  return (
    <div
      className="
        absolute
        z-20
        flex
        flex-col
        items-center
        pointer-events-none
      "
      style={{
        left: seat.left,
        top: seat.top,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* PLAYER NAME */}
      <div
        className={`
          whitespace-nowrap
          mb-2
          px-3
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

      {/* OPPONENT CARDS */}
      <div
        className="
          relative
          w-24
          h-16
          sm:w-28
          sm:h-20
        "
      >
        {Array.from({
          length: visibleCards,
        }).map((_, i) => {
          const middle =
            (visibleCards - 1) / 2;

          const offset = i - middle;

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `
                  translate(-50%, -50%)
                  translateX(${offset * 8}px)
                  rotate(${offset * 5}deg)
                `,
                zIndex: i,
              }}
            >
              <CardBack
                className="
                  !w-9
                  !h-14
                  sm:!w-10
                  sm:!h-16
                "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}