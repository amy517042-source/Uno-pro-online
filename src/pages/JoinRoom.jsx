import Card from "../components/Card";
import Button from "../components/Button";

export default function JoinRoom() {
  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center p-6">
      <Card className="max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">
          Join Room
        </h2>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="text"
          placeholder="Room Code"
          className="w-full p-3 border rounded-lg mb-6 uppercase"
        />

        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
          Join Room
        </Button>
      </Card>
    </div>
  );
}
