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