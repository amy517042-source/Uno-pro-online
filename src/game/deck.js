export const COLORS = ["Red", "Blue", "Green", "Yellow"];

export const VALUES = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Skip",
  "Reverse",
  "Draw2",
];

export function createDeck() {
  const deck = [];
  let id = 0;

  for (const color of COLORS) {
    deck.push({
      id: id++,
      color,
      value: "0",
    });

    for (let i = 1; i <= 9; i++) {
      deck.push({
        id: id++,
        color,
        value: i.toString(),
      });

      deck.push({
        id: id++,
        color,
        value: i.toString(),
      });
    }

    ["Skip", "Reverse", "Draw2"].forEach((action) => {
      deck.push({
        id: id++,
        color,
        value: action,
      });

      deck.push({
        id: id++,
        color,
        value: action,
      });
    });
  }

  for (let i = 0; i < 4; i++) {
    deck.push({
      id: id++,
      color: "Black",
      value: "Wild",
    });

    deck.push({
      id: id++,
      color: "Black",
      value: "WildDraw4",
    });
  }

  return deck.sort(() => Math.random() - 0.5);
}
