import Card from "../components/Card";

export default function Lobby({ roomCode, playerName }) {
  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center p-6">
      <Card className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4">
          🎮 Lobby
        </h1>

        <h2 className="text-xl mb-4">
          Room Code
        </h2>

        <div className="text-3xl font-bold tracking-widest bg-gray-100 rounded-lg p-4 mb-6">
          {roomCode}
        </div>

        <p className="mb-2">
          Welcome
        </p>

        <h2 className="text-2xl font-bold text-green-700">
          {playerName}
        </h2>

        <div className="mt-8 text-gray-600">
          Waiting for players...
        </div>
      </Card>
    </div>
  );
}