import { Loader2 } from "lucide-react";

export default function Loader({
  text = "Loading...",
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <Loader2 className="w-10 h-10 animate-spin text-yellow-400" />
      <p className="text-white font-semibold">{text}</p>
    </div>
  );
}
