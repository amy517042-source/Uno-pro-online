import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { createDeck } from "../game/deck";
import {
  isValidPlay,
  getNextTurn,
  reverseDirection,
  getDrawAmount,
} from "../game/rules";

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return code;
}

export async function createRoom(hostId, playerName, maxPlayers) {
  const roomCode = generateRoomCode();

  await setDoc(doc(db, "rooms", roomCode), {
    roomCode,
    hostId,
    hostName: playerName,
    maxPlayers,
    status: "waiting",
    createdAt: Date.now(),

    players: [
      {
        uid: hostId,
        name: playerName,
        joinedAt: Date.now(),
        isHost: true,
      },
    ],

    deck: [],
    discardPile: [],
    hands: {},
    currentPlayer: null,
    direction: 1,
    winner: null,
  });

  return roomCode;
}

export async function joinRoom(roomCode, playerId, playerName) {
  const roomRef = doc(db, "rooms", roomCode);

  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) {
    throw new Error("Room not found.");
  }

  const room = snapshot.data();

  const alreadyJoined = room.players.some(
    (player) => player.uid === playerId
  );

  if (alreadyJoined) {
    throw new Error("You have already joined this room.");
  }

  if (room.players.length >= room.maxPlayers) {
    throw new Error("Room is full.");
  }

  await updateDoc(roomRef, {
    players: arrayUnion({
      uid: playerId,
      name: playerName,
      joinedAt: Date.now(),
      isHost: false,
    }),
  });

  return room;
}

export function listenToRoom(roomCode, callback) {
  const roomRef = doc(db, "rooms", roomCode);

  return onSnapshot(roomRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data());
    }
  });
}

export async function startGame(roomCode) {
  const roomRef = doc(db, "rooms", roomCode);

  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) {
    throw new Error("Room not found.");
  }

  const room = snapshot.data();

  if (room.players.length < 2) {
    throw new Error("Need at least 2 players.");
  }

  const deck = createDeck();

  const hands = {};

  room.players.forEach((player) => {
    hands[player.uid] = deck.splice(0, 7);
  });

  let firstCard = deck.shift();

  while (firstCard.color === "Black") {
    deck.push(firstCard);
    firstCard = deck.shift();
  }

  await updateDoc(roomRef, {
    status: "playing",
    deck,
    hands,
    discardPile: [firstCard],
    currentPlayer: room.players[0].uid,
    direction: 1,
    winner: null,
    gameStartedAt: serverTimestamp(),
  });
}
function getPlayerIndex(players, uid) {
  return players.findIndex((player) => player.uid === uid);
}

function getNextPlayer(room) {
  const currentIndex = getPlayerIndex(
    room.players,
    room.currentPlayer
  );

  const nextIndex = getNextTurn(
    currentIndex,
    room.direction,
    room.players.length
  );

  return room.players[nextIndex].uid;
}

export async function drawCard(roomCode, playerUid) {
  const roomRef = doc(db, "rooms", roomCode);

  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) {
    throw new Error("Room not found.");
  }

  const room = snapshot.data();

  if (room.currentPlayer !== playerUid) {
    throw new Error("Not your turn.");
  }

  if (room.deck.length === 0) {
    throw new Error("Deck is empty.");
  }

  const deck = [...room.deck];

  const hands = {
    ...room.hands,
  };

  const drawnCard = deck.shift();

  hands[playerUid] = [
    ...hands[playerUid],
    drawnCard,
  ];

  const playable = isValidPlay(
  drawnCard,
  room.discardPile[room.discardPile.length - 1],
  room.currentColor ||
    room.discardPile[room.discardPile.length - 1].color
);

await updateDoc(roomRef, {
  deck,
  hands,
  currentPlayer: playable
    ? playerUid
    : getNextPlayer(room),
  drawnCard: playable
    ? drawnCard
    : null,
});
}

export async function playCard(
  roomCode,
  playerUid,
  card,
  chosenColor = null
) {
  const roomRef = doc(db, "rooms", roomCode);

  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) {
    throw new Error("Room not found.");
  }

  const room = snapshot.data();

  if (room.currentPlayer !== playerUid) {
    throw new Error("Not your turn.");
  }

  const topCard =
    room.discardPile[
      room.discardPile.length - 1
    ];

  let currentColor =
    topCard.color === "Black"
      ? room.currentColor
      : topCard.color;

  if (
    !isValidPlay(
      card,
      topCard,
      currentColor
    )
  ) {
    throw new Error("Invalid move.");
  }

  const hands = {
    ...room.hands,
  };

  hands[playerUid] =
    hands[playerUid].filter(
      (c) => c.id !== card.id
    );

  const discardPile = [
    ...room.discardPile,
    card,
  ];

  let direction = room.direction;

  let nextPlayer = getNextPlayer(room);

  let deck = [...room.deck];
  // Reverse
if (card.value === "Reverse") {

  // Official UNO rule:
  // With only 2 players, Reverse acts like Skip.
  if (room.players.length === 2) {
    nextPlayer = playerUid;
  } else {
    direction = reverseDirection(direction);

    const currentIndex = getPlayerIndex(
      room.players,
      playerUid
    );

    const nextIndex = getNextTurn(
      currentIndex,
      direction,
      room.players.length
    );

    nextPlayer = room.players[nextIndex].uid;
  }
}

  // Skip
  if (card.value === "Skip") {
    const currentIndex = getPlayerIndex(
      room.players,
      playerUid
    );

    const skipIndex = getNextTurn(
      getNextTurn(
        currentIndex,
        direction,
        room.players.length
      ),
      direction,
      room.players.length
    );

    nextPlayer = room.players[skipIndex].uid;
  }

  // Draw Two
  if (card.value === "Draw2") {
    const amount = getDrawAmount(card);

    const victim = nextPlayer;

    for (let i = 0; i < amount; i++) {
      if (deck.length === 0) break;

      hands[victim].push(deck.shift());
    }

    const victimIndex = getPlayerIndex(
      room.players,
      victim
    );

    const afterVictim = getNextTurn(
      victimIndex,
      direction,
      room.players.length
    );

    nextPlayer = room.players[afterVictim].uid;
  }

  // Wild
  currentColor =
    chosenColor || card.color;

  // Wild Draw Four
  if (card.value === "WildDraw4") {
    currentColor = chosenColor;

    const victim = nextPlayer;

    for (let i = 0; i < 4; i++) {
      if (deck.length === 0) break;

      hands[victim].push(deck.shift());
    }

    const victimIndex = getPlayerIndex(
      room.players,
      victim
    );

    const afterVictim = getNextTurn(
      victimIndex,
      direction,
      room.players.length
    );

    nextPlayer = room.players[afterVictim].uid;
  }

  // Winner
  let winner = null;

  if (hands[playerUid].length === 0) {
    winner = playerUid;
  }
  await updateDoc(roomRef, {
    hands,
    deck,
    discardPile,
    currentPlayer: winner ? null : nextPlayer,
    direction,
    currentColor,
    winner,
    status: winner ? "finished" : "playing",
  });

  return {
    winner,
    nextPlayer,
  };
}