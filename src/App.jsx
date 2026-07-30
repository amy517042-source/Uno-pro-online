import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import { loginAnonymous } from "./services/auth";

export default function App() {
  const [screen, setScreen] = useState(
  localStorage.getItem("unoRoomCode")
    ? "game"
    : "home"
);
  const [roomCode, setRoomCode] = useState(
  localStorage.getItem("unoRoomCode") || ""
);
  const [playerName, setPlayerName] = useState(
  localStorage.getItem("unoPlayerName") || ""
);

  useEffect(() => {
    async function login() {
      try {
        const user = await loginAnonymous();
        console.log("Logged in:", user.uid);
      } catch (error) {
        console.error(error);
      }
    }

    login();
  }, []);

useEffect(() => {
  if (roomCode) {
    localStorage.setItem("unoRoomCode", roomCode);
  }
}, [roomCode]);

useEffect(() => {
  if (playerName) {
    localStorage.setItem(
      "unoPlayerName",
      playerName
    );
  }
}, [playerName]);

  if (screen === "home") {
    return (
      <Home
        setScreen={setScreen}
        setRoomCode={setRoomCode}
        setPlayerName={setPlayerName}
      />
    );
  }

  if (screen === "lobby") {
    return (
      <Lobby
  roomCode={roomCode}
  playerName={playerName}
  setScreen={setScreen}
/>
    );
  }

  return (
  <Game
    roomCode={roomCode}
    playerName={playerName}
  />
);
}
