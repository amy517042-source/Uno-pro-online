export default function ColorPicker({
  open,
  onSelect,
  onClose,
}) {
  if (!open) return null;

  const colors = [
    {
      name: "Red",
      className: "bg-red-500",
    },
    {
      name: "Blue",
      className: "bg-blue-500",
    },
    {
      name: "Green",
      className: "bg-green-500",
    },
    {
      name: "Yellow",
      className: "bg-yellow-400",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 shadow-2xl w-80">

        <h2 className="text-2xl font-bold text-center mb-5">
          Choose a Colour
        </h2>

        <div className="grid grid-cols-2 gap-4">

          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => onSelect(color.name)}
              className={`${color.className} h-20 rounded-xl text-white text-xl font-bold hover:scale-105 transition`}
            >
              {color.name}
            </button>
          ))}

        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-gray-700 text-white rounded-lg py-3"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}