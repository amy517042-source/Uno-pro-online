export function getPlayerPositions(count) {

  if (count === 1) {
    return [
      {
        top: "8%",
        left: "50%",
        transform: "translateX(-50%)",
      },
    ];
  }

  if (count === 2) {
    return [
      {
        top: "8%",
        left: "50%",
        transform: "translateX(-50%)",
      },
      {
        top: "50%",
        left: "85%",
        transform: "translateY(-50%)",
      },
    ];
  }

  if (count === 3) {
    return [
      {
        top: "8%",
        left: "50%",
        transform: "translateX(-50%)",
      },
      {
        top: "45%",
        left: "88%",
      },
      {
        top: "45%",
        left: "4%",
      },
    ];
  }

  const radius = 40;
  const positions = [];

  for (let i = 0; i < count; i++) {
    const angle =
      (-90 + (360 / count) * i) *
      (Math.PI / 180);

    positions.push({
      left: `${50 + radius * Math.cos(angle)}%`,
      top: `${50 + radius * Math.sin(angle)}%`,
      transform: "translate(-50%,-50%)",
    });
  }

  return positions;
}
