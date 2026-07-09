import Card from "../components/Card";
import Button from "../components/Button";

export default function CreateRoom() {
  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center p-6">
      <Card className="max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Room
        </h2>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-3 border rounded-lg mb-4"
        />

        <select className="w-full p-3 border rounded-lg mb-6">
          <option>2 Players</option>
          <option>3 Players</option>
          <option>4 Players</option>
          <option>5 Players</option>
          <option>6 Players</option>
          <option>7 Players</option>
          <option>8 Players</option>
          <option>9 Players</option>
          <option>10 Players</option>
        </select>

        <Button className="w-full">
          Create Room
        </Button>
      </Card>
    </div>
  );
}
