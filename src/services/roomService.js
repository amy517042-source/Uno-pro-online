import {
  doc,
  setDoc,
  getDoc,
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

export async function createRoom(hostId) {
  try {
    const roomCode = generateRoomCode();

    console.log("Creating room:", roomCode);

    await setDoc(doc(db, "rooms", roomCode), {
      roomCode,
      hostId,
      players: [hostId],
      status: "waiting",
      createdAt: Date.now(),
    });

    console.log("Room created successfully");

    return roomCode;
  } catch (error) {
    console.error("Firestore Error:", error);
    throw error;
  }
}

export async function roomExists(roomCode) {
  const snapshot = await getDoc(doc(db, "rooms", roomCode));
  return snapshot.exists();
}