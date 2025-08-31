export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function getRandomColor() {
  const text = '1234567890ABCDEF';
  let deg = random(1, 180);
  let colorFirst = '#'
  let colorSecond = '#'
  for (let i = 0; i < 6; i++) {
    colorFirst += text[Math.floor(Math.random() * text.length)];
    colorSecond += text[Math.floor(Math.random() * text.length)];
  }
  return `linear-gradient(${deg}deg, ${colorFirst}, ${colorSecond})`;
}

export function showSpentTime(date) {
  const endTime = Date.now();
  const difference = endTime - date;
  let seconds = Math.floor(difference / 1000)  % 60;
  let minutes = Math.floor(difference / 1000 / 60)  % 60;
  let hours = Math.floor(difference / 1000 / 60 / 60);

  seconds = seconds.toString().length > 1 ? seconds.toString() : '0' + seconds.toString();
  minutes = minutes.toString().length > 1 ? minutes.toString() : '0' + minutes.toString();
  hours = hours.toString().length > 1 ? hours.toString() : '0' + hours.toString();
  return `Время проведённое на сайте:   ${hours}ч : ${minutes}м : ${seconds}с`;
}