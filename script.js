// CHANGE THIS to your ESP32 IP address
const ESP32 = "http://192.168.4.1";

function send(path) {
  fetch(ESP32 + path).catch(e => console.log(e));
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  return {
    r: parseInt(hex.substring(0,2), 16),
    g: parseInt(hex.substring(2,4), 16),
    b: parseInt(hex.substring(4,6), 16)
  };
}

function setPar(index, hex) {
  let c = hexToRgb(hex);
  send(`/api/par?index=${index}&r=${c.r}&g=${c.g}&b=${c.b}`);
}

function setAllPars(hex) {
  let c = hexToRgb(hex);
  for (let i = 0; i < 4; i++) {
    send(`/api/par?index=${i}&r=${c.r}&g=${c.g}&b=${c.b}`);
  }
}

function setHead(hex) {
  let c = hexToRgb(hex);
  send(`/api/mhColor?r=${c.r}&g=${c.g}&b=${c.b}&w=0`);
}

function setPan(v) {
  send(`/api/panTilt?pan=${v}&tilt=127`);
}

function setTilt(v) {
  send(`/api/panTilt?pan=127&tilt=${v}`);
}

function setFadeTime(v) {
  document.getElementById("fadeLabel").innerText = v + " seconds";
  send(`/api/setFadeTime?seconds=${v}`);
}
