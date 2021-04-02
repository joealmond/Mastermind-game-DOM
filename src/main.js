// Glaobal variables:

const TURNS = 10;
let actualTurns = TURNS;
const secretCode = generateSecret();

const inputForm = document.getElementById("inputForm");
const inputField = document.getElementById("inputField");

// Function declarations:

function generateDigit() {
  // Legenerál egy '0' és '9' közötti számjegyet
  return String(Math.trunc(Math.random() * 10));
}

function generateSecret() {
  // Legenerálja a négyjegyű titkos megoldást.
  let result = [];
  let index;
  for (index = 0; index < 4; ++index) {
    result.push(generateDigit());
  }
  return result;
}

function readGuess() {
  // Bekéri a tippet a felhasználótól ami egy negyjegyű egész szám
  let guess = inputField.value.split(" ").join("");
  inputField.value = "";
  let isNumber;
  isNumber = isNaN(Number(guess));
  if (guess.length !== 4) return;
  if (isNumber !== false) return;
  return guess.split("");
}

// Main program:

// console.log(
//   "Titkos kód: " + secretCode + "    ...Tesztelési célokra megjelenítve..."
// );

inputForm.addEventListener(
  "submit",
  function (evt) {
    evt.preventDefault();
    return console.log(readGuess());
  },
  false
);
