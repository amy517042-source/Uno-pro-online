import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import { auth } from "../firebase/firebase";
import { createRoom, joinRoom } from "../services/roomService";

export default function Home() {
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!playerName.trim()) {
      alert("Please enter your name.");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      alert("User not logged in.");
      return;
    }

    try {
      const newRoomCode = await createRoom(user.uid);

      alert(`🎉 Room Created!\n\nRoom Code: ${newRoomCode}`);

      setRoomCode(newRoomCode);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function handleJoinRoom() {
    if (!playerName.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!roomCode.trim()) {
      alert("Please enter a room code.");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      alert("User not logged in.");
      return;
    }

    try {
      await joinRoom(roomCode, user.uid);

      alert(`🎉 Joined Room: ${roomCode}`);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center p-6">
      <Card className="max-w-md w-full text-center">
        <h1 className="text-5xl font-bold text-green-700 mb-3">
          🎮 UNO Pro Online
        </h1>

        <p className="text-gray-600 mb-6">
          Play UNO online with friends anywhere in the world.
        </p>

        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <Button
          className="w-full mb-4"
          onClick={handleCreateRoom}
        >
          Create Room
        </Button>

        <input
          type="text"
          placeholder="Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          className="w-full border rounded-lg p-3 mb-4 uppercase"
        />

        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleJoinRoom}
        >
          Join Room
        </Button>
      </Card>
    </div>
  );
}