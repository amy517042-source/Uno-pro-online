export function isValidPlay(card, topCard, currentColor) {
  if (!card || !topCard) return false;

  // Wild cards can always be played
  if (card.color === "Black") return true;

  // Same active color
  if (card.color === currentColor) return true;

  // Same value/action
  if (card.value === topCard.value) return true;

  return false;
}

export function getNextTurn(currentTurn, direction, totalPlayers) {
  return (currentTurn + direction + totalPlayers) % totalPlayers;
}

export function reverseDirection(direction) {
  return direction * -1;
}

export function needsColorSelection(card) {
  return (
    card.value === "Wild" ||
    card.value === "WildDraw4"
  );
}

export function getDrawAmount(card) {
  if (card.value === "Draw2") return 2;
  if (card.value === "WildDraw4") return 4;
  return 0;
}

export function isActionCard(card) {
  return [
    "Skip",
    "Reverse",
    "Draw2",
    "Wild",
    "WildDraw4",
  ].includes(card.value);
  }
