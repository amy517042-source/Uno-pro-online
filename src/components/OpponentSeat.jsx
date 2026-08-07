import CardBack from "./CardBack";

export default function OpponentSeat({
  player,
  index,
  totalPlayers,
  cardCount,
  isCurrentTurn,
}) {
  /*
   * Players are positioned around the central circle.
   *
   * The local player is NOT included here.
   * Their hand remains at the bottom.
   */

  const total = totalPlayers + 1;

  /*
   * Spread opponents around the upper/side area.
   *
   * We leave the bottom area free for the local
   * player's cards.
   */

  const getPosition = () => {
    if (totalPlayers === 1) {
      return {
        left: 50,
        top: 12,
        rotation: 0,
      };
    }

    /*
     * 2 opponents
     */
    if (totalPlayers === 2) {
      const positions = [
        {
          left: 18,
          top: 40,
          rotation: -90,
        },
        {
          left: 82,
          top: 40,
          rotation: 90,
        },
      ];

      return positions[index];
    }

    /*
     * 3 opponents
     */
    if (totalPlayers === 3) {
      const positions = [
        {
          left: 15,
          top: 38,
          rotation: -90,
        },
        {
          left: 50,
          top: 10,
          rotation: 0,
        },
        {
          left: 85,
          top: 38,
          rotation: 90,
        },
      ];

      return positions[index];
    }

    /*
     * 4+ opponents
     *
     * Spread them across the upper 260°
     * of the circle.
     */

    const startAngle = -160;
    const endAngle = -20;

    const angle =
      startAngle +
      ((endAngle - startAngle) *
        index) /
        (totalPlayers - 1);

    const radians =
      (angle * Math.PI) / 180;

    const radiusX = 38;
    const radiusY = 38;

    const left =
      50 + Math.cos(radians) * radiusX;

    const top =
      50 + Math.sin(radians) * radiusY;

    /*
     * Cards face toward the center.
     */
    const rotation = angle + 90;

    return {
      left,
      top,
      rotation,
    };
  };

  const position = getPosition();

  /*
   * Automatically reduce card size
   * when more players join.
   */

  let cardClass =
    "!w-10 !h-16";

  if (total >= 4) {
    cardClass =
      "!w-9 !h-14";
  }

  if (total >= 6) {
    cardClass =
      "!w-8 !h-12";
  }

  if (total >= 8) {
    cardClass =
      "!w-7 !h-11";
  }

  if (total >= 10) {
    cardClass =
      "!w-6 !h-10";
  }

  const visibleCards =
    Math.min(cardCount, 7);

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
        left: `${position.left}%`,
        top: `${position.top}%`,
        transform: `
          translate(-50%, -50%)
          rotate(${position.rotation}deg)
        `,
      }}
    >

      {/* Player name */}
      <div
        className={`
          whitespace-nowrap
          mb-1
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

      {/* Opponent cards */}
      <div className="relative h-16 w-28">

        {Array.from({
          length: visibleCards,
        }).map((_, i) => {

          const middle =
            (visibleCards - 1) / 2;

          const offset =
            i - middle;

          return (
            <div
              key={i}
              className="
                absolute
                left-1/2
                top-1/2
              "
              style={{
                transform: `
                  translate(-50%, -50%)
                  translateX(${offset * 7}px)
                  rotate(${offset * 4}deg)
                `,
                zIndex: i,
              }}
            >
              <CardBack
                className={cardClass}
              />
            </div>
          );
        })}

      </div>
    </div>
  );
}