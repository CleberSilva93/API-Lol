//converte a duração da partida de segundos para minutos
module.exports = function makeMinutes(matchTime) {
  let minutes = Math.floor(matchTime / 60);
  let seconds = ((matchTime / 60 - minutes) * 60).toFixed(0);
  if (seconds < 10) seconds = "0" + seconds;
  return `${minutes}:${seconds}`;
};
