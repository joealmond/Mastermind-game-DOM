// Glaobal variables:

const TURNS = 10;
let actualTurns = TURNS;
const secretCode = generateSecret();

// Function declarations:

/**
 * Legenerál egy '0' és '9' közötti számjegyet
 *
 * @return string
 */

function generateDigit() {
  return String(Math.trunc(Math.random() * 10));
}

/**
 * Legenerálja a négyjegyű titkos megoldást.
 *
 * @return Array of '0'...'9' - A négy elemű titkos megoldás
 */
function generateSecret() {
  let result = [];
  let index;
  for (index = 0; index < 4; ++index) {
    result.push(generateDigit());
  }
  return result;
}

function readGuess() {
  let guess, isNumber;
  do {
    guess = prompt(
      "Adj meg egy négyjegyű számot! Még " +
        actualTurns +
        "x tippelhets! \n A kilépéshez írd be 'exit.'"
    )
      .split(" ")
      .join("");
    isNumber = isNaN(Number(guess));
    if (guess === "exit") break;
  } while (isNumber || guess.length !== 4);
  if (guess !== "exit") return guess.split("");
  if (guess === "exit") return guess;
}

function getRedCount(guess) {
  let redCount = 0;
  let i;
  for (i = 0; i < 4; i++) {
    if (secretCode[i] === guess[i]) {
      redCount = redCount + 1;
    }
  }
  return redCount;
}

function getWhiteCount(guess) {
  let whiteCount = 0;
  let whiteCountHelper = new Set();
  let secretCodeHelper = secretCode.slice(); // le kell másolni, hiszen referencia hivatkozás!!!
  let guessHelper = guess.slice();
  let i, j;
  for (i = 0; i < secretCodeHelper.length; ++i) {
    if (secretCodeHelper[i] === guessHelper[j]) {
      whiteCountHelper.add(guess[i]);
    }
    for (j = 0; j < guessHelper.length; ++j) {
      if (secretCodeHelper[i] === guessHelper[j]) {
        whiteCountHelper.add(guess[j]);
      }
    }
    if (j >= 0) {
      j = j - 1;
    }
  }
  if (i >= 0) {
    i = i - 1;
  }
  whiteCount = whiteCountHelper.size;
  return whiteCount;
}

function isGameWon(redCount) {
  if (redCount !== 4) {
    return;
  } else return redCount === 4;
}

// Main program:

console.log(
  "Titkos kód: " + secretCode + "    ...Tesztelési célokra megjelenítve..."
);
// document.body.innerHTML = `<p>Titkos kód: ${secretCode}<p>`;
function gameloop() {
  while (actualTurns != 0) {
    let guess = readGuess();
    if (guess === "exit") {
      console.log("Viszlát!");
      break;
    } else {
      console.log("Tipp: " + guess);
    }
    let redCount = getRedCount(guess);
    console.log("Talált és a helyén van: " + redCount);
    console.log("Talált és nincs a helyén: " + getWhiteCount(guess));
    if (isGameWon(redCount)) {
      console.log("Nyertél");
      break;
    }
    actualTurns = actualTurns - 1;
    console.log("Hátralévő próbálkozások: " + TURNS + "/" + actualTurns);
  }
  if (actualTurns === 0) {
    console.log("Nem nyertél");
  }
}

gameloop();
