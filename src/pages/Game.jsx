import { useState } from "react";

import PlayerHand from "../components/PlayerHand";
import OpponentHand from "../components/OpponentHand";
import CenterPile from "../components/CenterPile";

import { createDeck } from "../game/deck";

export default function Game() {
  const deck = createDeck();

  const [playerCards] = useState(deck.slice(0, 7));

  const topCard = deck[20];

  return (
    <div className="min-h-screen bg-green-800 relative overflow-hidden">

      {/* Table */}
      <div className="absolute inset-0 flex items-center justify-center">

        <CenterPile
          topCard={topCard}
          currentColor={topCard.color}
          deckCount={deck.length}
          canDraw={true}
          onDraw={() => alert("Draw card")}
        />

      </div>

      {/* Top Opponent */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2">
        <OpponentHand
          playerName="Player 2"
          cardCount={7}
        />
      </div>

      {/* Left Opponent */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2">
        <OpponentHand
          playerName="Player 3"
          cardCount={7}
        />
      </div>

      {/* Right Opponent */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2">
        <OpponentHand
          playerName="Player 4"
          cardCount={7}
        />
      </div>

      {/* Your Hand */}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full">

        <PlayerHand
          cards={playerCards}
          canPlay={true}
          onCardClick={(index) =>
            alert(`Clicked card ${index + 1}`)
          }
        />

      </div>

    </div>
  );
          }
