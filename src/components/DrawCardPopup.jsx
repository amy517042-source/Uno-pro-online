import UnoCard from "./UnoCard";

export default function DrawCardPopup({
  open,
  card,
  onPlay,
  onKeep,
}) {
  if (!open || !card) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 text-center shadow-2xl">

        <h2 className="text-2xl font-bold mb-4">
          You drew a playable card!
        </h2>

        <div className="flex justify-center mb-6">
          <UnoCard card={card} disabled />
        </div>

        <div className="flex gap-4 justify-center">

          <button
            onClick={onPlay}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700"
          >
            ▶ Play
          </button>

          <button
            onClick={onKeep}
            className="bg-gray-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800"
          >
            Keep
          </button>

        </div>

      </div>

    </div>
  );
}