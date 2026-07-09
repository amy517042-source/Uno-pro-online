export function shuffleDeck(deck) {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function displayValue(value) {
  switch (value) {
    case "Skip":
      return "⊘";

    case "Reverse":
      return "⇄";

    case "Draw2":
      return "+2";

    case "Wild":
      return "WILD";

    case "WildDraw4":
      return "+4";

    default:
      return value;
  }
}

export function getColorClass(color) {
  switch (color) {
    case "Red":
      return "bg-red-500 text-white";

    case "Blue":
      return "bg-blue-500 text-white";

    case "Green":
      return "bg-green-500 text-white";

    case "Yellow":
      return "bg-yellow-400 text-black";

    case "Black":
      return "bg-gray-900 text-white";

    default:
      return "bg-white text-black";
  }
}
