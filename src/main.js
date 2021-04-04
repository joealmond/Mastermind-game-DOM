// Glaobal variables:

const TURNS = 10;
let actualTurns = TURNS;
const secretCode = generateSecret();
// const rowHeader = 1;
const counterObj = {
  counter: 1,
  add: function (increment = 1) {
    this.counter = this.counter + increment;
    return this.counter;
  },
};

const gameStatus = {
  isGameWon: false,
  checkIfWon: function () {
    if (this.isGameWon === true) return this.isGameWon;
  },
};

// const digitsQuantity = 4;
// const dispalyDigits = 2;
// let tdActualCounter = 1;
// let guessDigit;

const inputForm = document.getElementById("inputForm");
const inputField = document.getElementById("inputField");
const gameStatusDisplay = document.getElementById("gameStatus");
const gameRestart = document.getElementById("restart");

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

function writeGuess(guess) {
  function getRedCount(guess) {
    // Összeveti mely számjegyek vannak a helyén és visszaadja a találatok összegét.
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
    // Összevet hogy vannak-e olyan számok amelyek nincsenek a helyükön de előfordulnak.
    // Minden számjegy csak egyszer szerepelhet, miközben a helyükön lévő számjegyek nem szerepelhetnek.
    let whiteCount = 0;
    let whiteCountHelper = new Set(); // egy halmazban tárolom átmenetileg az eredmény számokat.
    let secretCodeHelper = secretCode.slice(); // a stringet tömb objektummá alakítom és mivel így már referencia érték ezét készítek egy másolatot, hogy az eredei érték ne módosuljon.
    let guessHelper = guess.slice(); // a stringet tömb objektummá alakítom és mivel így már referencia érték ezét készítek egy másolatot, hogy az eredeti érték ne módosuljon.
    let i, j;
    for (i = 0; i < secretCodeHelper.length; ++i) {
      // az egyásba ágyazott ciklusok gondoskodnak aról hogy a két tömb minden eleme össz elegyen vetve egymással.
      if (i === j && secretCodeHelper[i] == guessHelper[j]) {
        // ha találok helyi értéken egyezést akkor azt kiveszem a tömbökből.
        secretCodeHelper.splice(i, 1);
        guessHelper.splice(j, 1);
        if (i >= 0) {
          // mivel kivettem egy elemt a tömbökből az rövidebb lett, ezt kompenzálni kell vigyázva arra hogy az érték ne legyen negatív szám.
          i = i - 1;
        }
      } else if (secretCodeHelper[i] === guessHelper[j]) {
        whiteCountHelper.add(guess[j]);
      }
      for (j = 0; j < guessHelper.length; ++j) {
        if (i === j && secretCodeHelper[i] == guessHelper[j]) {
          secretCodeHelper.splice(i, 1);
          guessHelper.splice(j, 1);
          if (j >= 0) {
            j = j - 1;
          }
        } else if (secretCodeHelper[i] === guessHelper[j]) {
          whiteCountHelper.add(guess[j]);
        }
      }
    }

    whiteCount = whiteCountHelper.size; // megnézem az eredményhalmaz méretét majd visszadom azt
    return whiteCount;
  }

  const tdActual = document.querySelectorAll("td");
  if (tdActual[counterObj.counter] !== undefined) {
    for (let i = 0; i < guess.length; i++) {
      tdActual[counterObj.counter].textContent = guess[i];
      counterObj.add();
    }
    let redCount = getRedCount(guess);
    tdActual[counterObj.counter].textContent = redCount;
    counterObj.add();
    tdActual[counterObj.counter].textContent = getWhiteCount(guess);
    counterObj.add(2);
    if (redCount === 4) gameStatus.isGameWon = true;
  } else {
    gameStatusDisplay.textContent = `Nem nyertél! A titkos kód ${secretCode
      .toString()
      .split(",")
      .join("")} volt.`;
    document.getElementById("inputField").setAttribute("disabled", "");
  }
}

// Main program:

console.log("Titkos kód: " + secretCode.toString().split(",").join(""));

inputForm.addEventListener(
  "submit",
  function (evt) {
    evt.preventDefault();
    let guess = readGuess();
    if (guess !== undefined) {
      writeGuess(guess);
    }
    if (gameStatus.isGameWon === true) {
      gameStatusDisplay.textContent = `Nyertél! A titkos kód valóban ${secretCode
        .toString()
        .split(",")
        .join("")} volt.`;
    }
  },
  false
);

gameRestart.addEventListener("click", (evt) => {
  location.reload(evt);
});
