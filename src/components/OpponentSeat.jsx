import CardBack from "./CardBack";

export default function OpponentSeat({
  player,
  index,
  totalPlayers,
  cardCount,
  isCurrentTurn,
}) {

  /*
   * Center of the game.
   *
   * Players are positioned around it.
   *
   * We intentionally leave a large empty
   * area around the center pile.
   */

  const getPosition = () => {

    // 1 opponent
    if (totalPlayers === 1) {
      return {
        left: "50%",
        top: "12%",
        rotation: 0,
        direction: "horizontal",
      };
    }

    // 2 opponents
    if (totalPlayers === 2) {

      return index === 0
        ? {
            left: "13%",
            top: "50%",
            rotation: 90,
            direction: "vertical",
          }
        : {
            left: "87%",
            top: "50%",
            rotation: -90,
            direction: "vertical",
          };
    }

    // 3 opponents
    if (totalPlayers === 3) {

      const seats = [
        {
          left: "12%",
          top: "50%",
          rotation: 90,
          direction: "vertical",
        },
        {
          left: "50%",
          top: "12%",
          rotation: 0,
          direction: "horizontal",
        },
        {
          left: "88%",
          top: "50%",
          rotation: -90,
          direction: "vertical",
        },
      ];

      return seats[index];
    }

    /*
     * 4–9 opponents
     *
     * Upper semicircle.
     */

    const angle =
      Math.PI -
      (Math.PI * index) /
        (totalPlayers - 1);

    const radiusX = 39;
    const radiusY = 37;

    const x =
      50 + Math.cos(angle) * radiusX;

    const y =
      45 - Math.sin(angle) * radiusY;

    let rotation = 0;
    let direction = "horizontal";

    if (x < 30) {
      rotation = 90;
      direction = "vertical";
    }

    if (x > 70) {
      rotation = -90;
      direction = "vertical";
    }

    return {
      left: `${x}%`,
      top: `${y}%`,
      rotation,
      direction,
    };
  };

  const seat = getPosition();

  /*
   * Don't render all cards for opponents.
   * We only need to visually show their hand.
   */
  const visibleCards = Math.min(cardCount, 7);

  const cardWidth =
    totalPlayers >= 8
      ? "w-7 h-11"
      : totalPlayers >= 6
      ? "w-8 h-12"
      : "w-9 h-14";

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
          px-2
          py-1
          rounded-full
          text-xs
          sm:text-sm
          font-bold
          shadow-lg
          mb-1

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
        className={`
          relative
          ${
            seat.direction === "vertical"
              ? "w-14 h-20"
              : "w-24 h-14"
          }
        `}
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
                transform:
                  seat.direction === "vertical"
                    ? `
                      translate(-50%, -50%)
                      translateY(${offset * 4}px)
                      rotate(${seat.rotation}deg)
                    `
                    : `
                      translate(-50%, -50%)
                      translateX(${offset * 7}px)
                      rotate(${offset * 3}deg)
                    `,
                zIndex: i,
              }}
            >
              <CardBack
                className={`!${cardWidth}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}