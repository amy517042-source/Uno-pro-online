export function getPlayerPosition(index, total) {
  const radius = 40;

  const angle =
    (-90 + (360 / total) * index) * (Math.PI / 180);

  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);

  return {
    left: `${x}%`,
    top: `${y}%`,
    rotate: angle * (180 / Math.PI) + 90,
  };
}
