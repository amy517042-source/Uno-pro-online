import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { auth } from "../firebase/firebase";
import { listenToRoom, startGame } from "../services/roomService";

export default function Lobby({ roomCode, playerName }) {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (!roomCode) return;

    const unsubscribe = listenToRoom(roomCode, (roomData) => {
      setRoom(roomData);
    });

    return () => unsubscribe();
  }, [roomCode]);

  if (!room) {
    return (
      <div className="min-h-screen bg-green-700 flex items-center justify-center">
        <h2 className="text-white text-2xl">Loading Lobby...</h2>
      </div>
    );
  }

  const isHost = auth.currentUser?.uid === room.hostId;

  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center p-6">
      <Card className="max-w-lg w-full">

        <h1 className="text-4xl font-bold text-center mb-2">
          🎮 UNO Lobby
        </h1>

        <div className="text-center text-gray-600 mb-4">
          Room Code
        </div>

        <div className="text-center text-3xl font-bold tracking-widest bg-gray-100 rounded-lg p-3 mb-6">
          {room.roomCode}
        </div>

        <div className="mb-4 font-bold">
          Players ({room.players.length}/{room.maxPlayers})
        </div>

        <div className="space-y-3">

          {room.players.map((player) => (
            <div
              key={player.uid}
              className="flex justify-between items-center bg-gray-100 rounded-lg p-3"
            >
              <span>{player.name}</span>

              {player.isHost && (
                <span className="text-yellow-600 font-bold">
                  👑 Host
                </span>
              )}
            </div>
          ))}

        </div>

        {isHost ? (
          <Button
  className="w-full mt-6"
  disabled={room.players.length < 2}
  onClick={async () => {
    try {
      await startGame(room.roomCode);
    } catch (error) {
      alert(error.message);
    }
  }}
>
  Start Game
</Button>
        ) : (
          <div className="text-center mt-6 text-gray-600">
            Waiting for host to start...
          </div>
        )}

      </Card>
    </div>
  );
}