import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

import {
  listenToRoom,
  playCard,
 drawCard,
  keepDrawnCard,
} from "../services/roomService";
import DrawCardPopup from "../components/DrawCardPopup";
import PlayerHand from "../components/PlayerHand";
import OpponentHand from "../components/OpponentHand";
import CenterPile from "../components/CenterPile";
import ColorPicker from "../components/ColorPicker";

export default function Game({
  roomCode,
  playerName,
}) {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
const [drawnCard, setDrawnCard] = useState(null);
const [colorPickerOpen, setColorPickerOpen] = useState(false);
const [pendingCard, setPendingCard] = useState(null);
  const currentUser = auth.currentUser;



  useEffect(() => {
    if (!roomCode) return;

    const unsubscribe = listenToRoom(
      roomCode,
      (roomData) => {
        setRoom(roomData);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [roomCode]);

useEffect(() => {
  if (
    room?.drawnCard &&
    room.currentPlayer === currentUser.uid
  ) {
    setDrawnCard(room.drawnCard);
  } else {
    setDrawnCard(null);
  }
}, [room, currentUser?.uid]);

if (!currentUser) {
  return (
    <div className="min-h-screen bg-green-800 flex items-center justify-center">
      <h2 className="text-white text-2xl">
        Signing in...
      </h2>
    </div>
  );
}

  if (loading || !room || !currentUser) {
    return (
      <div className="min-h-screen bg-green-800 flex items-center justify-center">
        <h2 className="text-white text-2xl">
          Loading Game...
        </h2>
      </div>
    );
  }

  const myCards =
    room.hands?.[currentUser.uid] || [];
  const topCard =
    room.discardPile?.[
      room.discardPile.length - 1
    ];

  const deckCount =
    room.deck?.length || 0;

  const isMyTurn =
    room.currentPlayer === currentUser.uid;

  const opponents =
    room.players.filter(
      (player) =>
        player.uid !== currentUser.uid
    );
  async function handlePlayCard(index) {
  
    if (!isMyTurn) {
      alert("It's not your turn.");
      return;
    }

    const card = myCards[index];

    try {
      let chosenColor = null;

      if (card.color === "Black") {
  setPendingCard(card);
  setColorPickerOpen(true);
  return;
}

      await playCard(
        roomCode,
        currentUser.uid,
        card,
        chosenColor
      );
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDrawCard() {
    if (!isMyTurn) {
      alert("It's not your turn.");
      return;
    }


    try {
      await drawCard(
        roomCode,
        currentUser.uid
      );
    } catch (error) {
      alert(error.message);
    }
  }
async function handlePlayDrawnCard() {
  if (!drawnCard) return;

  // Find the exact card inside the player's hand
  const cardInHand = myCards.find(
    (c) => c.id === drawnCard.id
  );

  if (!cardInHand) {
    alert("Card not found.");
    return;
  }

  // Wild / Wild Draw 4
  if (cardInHand.color === "Black") {
    setPendingCard(cardInHand);
    setColorPickerOpen(true);
    setDrawnCard(null);
    return;
  }

  try {
    await playCard(
      roomCode,
      currentUser.uid,
      cardInHand,
      null
    );

    setDrawnCard(null);

  } catch (error) {
    alert(error.message);
  }
}

async function handleKeepCard() {
  try {
    await keepDrawnCard(
      roomCode,
      currentUser.uid
    );

    setDrawnCard(null);

  } catch (error) {
    alert(error.message);
  }
}
async function handleColorSelect(color) {
  setColorPickerOpen(false);

  if (!pendingCard) return;

  try {
    await playCard(
      roomCode,
      currentUser.uid,
      pendingCard,
      color
    );

    setPendingCard(null);

  } catch (error) {
    alert(error.message);
  }
}

  if (room.winner) {
localStorage.removeItem("unoRoomCode");
localStorage.removeItem("unoPlayerName");

    const winnerPlayer = room.players.find(
      (player) => player.uid === room.winner
    );

    return (
      <div className="min-h-screen bg-green-800 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 text-center shadow-2xl">

          <h1 className="text-5xl font-bold mb-4">
            🏆 Winner
          </h1>

          <h2 className="text-3xl text-green-700 font-bold">
            {winnerPlayer?.name}
          </h2>

        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-green-800 relative overflow-hidden">

      {/* Center Table */}
      <div className="absolute inset-0 flex items-center justify-center">

        <CenterPile
  topCard={topCard}
  currentColor={room.currentColor || topCard?.color || ""}
  deckCount={deckCount}
  canDraw={isMyTurn}
  onDraw={handleDrawCard}
/>

      </div>

      {/* Top Opponent */}
      {opponents[0] && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2">
          <OpponentHand
            playerName={opponents[0].name}
            cardCount={
              room.hands?.[opponents[0].uid]?.length || 0
            }
            isCurrentTurn={
              room.currentPlayer === opponents[0].uid
            }
          />
        </div>
      )}

      {/* Left Opponent */}
      {opponents[1] && (
        <div className="absolute left-5 top-1/2 -translate-y-1/2">
          <OpponentHand
            playerName={opponents[1].name}
            cardCount={
              room.hands?.[opponents[1].uid]?.length || 0
            }
            isCurrentTurn={
              room.currentPlayer === opponents[1].uid
            }
          />
        </div>
      )}

      {/* Right Opponent */}
      {opponents[2] && (
        <div className="absolute right-5 top-1/2 -translate-y-1/2">
          <OpponentHand
            playerName={opponents[2].name}
            cardCount={
              room.hands?.[opponents[2].uid]?.length || 0
            }
            isCurrentTurn={
              room.currentPlayer === opponents[2].uid
            }
          />
        </div>
      )}

      {/* Turn Indicator */}
      <div className="absolute top-2 left-2 bg-black/60 text-white px-4 py-2 rounded-lg font-bold">
        {isMyTurn ? "🟢 Your Turn" : "⏳ Waiting..."}
      </div>

      {/* Your Cards */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full">
         <PlayerHand
          cards={myCards}
          canPlay={isMyTurn}
          onCardClick={handlePlayCard}
        />
        

      </div>
<ColorPicker
  open={colorPickerOpen}
  onSelect={handleColorSelect}
  onClose={() => {
    setColorPickerOpen(false);
    setPendingCard(null);
  }}
/>
<DrawCardPopup
  open={!!drawnCard}
  card={drawnCard}
  onPlay={handlePlayDrawnCard}
  onKeep={handleKeepCard}
/>
    </div>
  );
}