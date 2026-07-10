import { useEffect } from "react";
import Home from "./pages/Home";
import { loginAnonymous } from "./services/auth";

export default function App() {
  useEffect(() => {
    async function login() {
      try {
        const user = await loginAnonymous();
        console.log("Logged in:", user.uid);
      } catch (error) {
        console.error("Login failed:", error);
      }
    }

    login();
  }, []);

  return <Home />;
}