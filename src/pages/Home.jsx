import Button from "../components/Button";
import Card from "../components/Card";

export default function Home() {
  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center p-6">
      <Card className="max-w-md w-full text-center">
        <h1 className="text-5xl font-bold text-green-700 mb-3">
          🎮 UNO Pro Online
        </h1>

        <p className="text-gray-600 mb-8">
          Play UNO online with friends anywhere in the world.
        </p>

        <div className="space-y-4">
          <Button className="w-full">
            Create Room
          </Button>

          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Join Room
          </Button>
        </div>
      </Card>
    </div>
  );
}
