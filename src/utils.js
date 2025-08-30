export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function getRandomColor() {
  const text = '1234567890ABCDEF';
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += text[Math.floor(Math.random() * text.length)];
  }
  return color;
}