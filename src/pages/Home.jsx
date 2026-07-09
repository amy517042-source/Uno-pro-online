import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Home() {
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");

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

        <Button className="w-full mb-4">
          Create Room
        </Button>

        <input
          type="text"
          placeholder="Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          className="w-full border rounded-lg p-3 mb-4 uppercase"
        />

        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
          Join Room
        </Button>

      </Card>
    </div>
  );
          }
