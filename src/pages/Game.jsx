import { useEffect, useState } from "react";
import { listenToRoom } from "../services/roomService";

import PlayerHand from "../components/PlayerHand";
import OpponentHand from "../components/OpponentHand";
import CenterPile from "../components/CenterPile";

import { createDeck } from "../game/deck";

export default function Game({
  roomCode,
  playerName,
}) {

  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (!roomCode) return;

    const unsubscribe = listenToRoom(roomCode, (roomData) => {
      setRoom(roomData);
    });

    return () => unsubscribe();
  }, [roomCode]);

  const deck = createDeck();

  const [playerCards] = useState(deck.slice(0, 7));

  const topCard = deck[20];
const opponents = room.players.filter(
  (player) => player.uid !== room.hostId
);

  if (!room) {
    return (
      <div className="min-h-screen bg-green-800 flex items-center justify-center">
        <h2 className="text-white text-2xl">
          Loading Game...
        </h2>
      </div>
    );
  }

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
{opponents[0] && (
  <div className="absolute top-5 left-1/2 -translate-x-1/2">
    <OpponentHand
      playerName={opponents[0].name}
      cardCount={7}
    />
  </div>
)}
      {/* Left Opponent */}
{opponents[1] && (
  <div className="absolute left-5 top-1/2 -translate-y-1/2">
    <OpponentHand
      playerName={opponents[1].name}
      cardCount={7}
    />
  </div>
)}

      {/* Right Opponent */}
{opponents[2] && (
  <div className="absolute right-5 top-1/2 -translate-y-1/2">
    <OpponentHand
      playerName={opponents[2].name}
      cardCount={7}
    />
  </div>
)}

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
