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