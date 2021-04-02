// Glaobal variables:

const TURNS = 10;
let actualTurns = TURNS;
const secretCode = generateSecret();

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

function isGameWon(redCount) {
  // ha a helyiértéken való találatok száma eléri a 4-et akkor azt visszadaom.
  if (redCount !== 4) {
    return;
  } else return redCount === 4;
}

// Main program:

console.log(
  "Titkos kód: " + secretCode + "    ...Tesztelési célokra megjelenítve..."
);
function gameloop() {
  while (true) {
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
    if (actualTurns === 0) {
      console.log("Nem nyertél");
      break;
    }
  }
}

gameloop();
