export async function startGame(roomCode) {
  const roomRef = doc(db, "rooms", roomCode);

  await updateDoc(roomRef, {
    status: "playing",
    gameStartedAt: serverTimestamp(),
  });
}