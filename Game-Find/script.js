// 1~5 : 3*3
//6~10 : 4*4
//11~15 : 5*5

const btnStart = document.querySelector('.btn-start')
const gameBoard = document.querySelector('.wrap-game')
const txtDesc = document.querySelector('.start-desc')
let btnCheck = document.querySelector('.btn')
let txtBelow = document.querySelector('.txt-below')

let randomR = 0
let randomC = 0

btnStart.addEventListener('click', () => {
  btnStart.style.display = "none";
  txtDesc.style.display = "none"
  gameBoard.style.display = "grid";
  playGame();
})

let i = 1;

function playGame() {
  if (i == 5 || i == 8 || i == 12 || i == 14) {
    txtBelow.innerHTML = `<strong>BONUS STAGE</strong>`
  } else {
    txtBelow.innerHTML = `<strong>${i} / 15 도전중</strong>`
  }

  // 게임판 만들기
  if (i < 6) {
    makeBoard(3);
    gameBoard.style.zoom = "0.9";

  } else if (i < 11) {
    makeBoard(4);
    gameBoard.style.zoom = "0.7";
  } else {
    makeBoard(5);
    gameBoard.style.zoom = "0.55";
  }
}

const makeBoard = (n) => {
  let clsName = 'bg-' + i;
  let degree = 360 / (n * n)
  gameBoard.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

  randomR = parseInt(Math.random() * n)
  randomC = parseInt(Math.random() * n)

  let tmp = 1
  for (let c = 0; c < n; c++) {
    for (let r = 0; r < n; r++) {
      const base = document.createElement("button")
      base.classList.add("btn")
      base.classList.add(clsName)
      base.addEventListener("click", (e) => {
        checkCorrect(e)
      })
      if (c == randomC && r == randomR) {
        // 다른 그림
        if (i == 5 || i == 8 || i == 12 || i == 14) {
          base.classList.add("invert")
        } else
          base.classList.add("flip")
      } else {
        base.style.transform = `rotate(${tmp++ * degree}deg)`;
      }
      if ((parseInt(Math.random() * 2)) == 1) {
        gameBoard.append(base)
      } else {
        gameBoard.prepend(base)
      }
    }
  }
}

const checkCorrect = (e) => {
  for (let c of e.currentTarget.classList)
    if (c == "flip" || c == "invert") {
      i++;
      if (i > 15) {
        alert('클리어~!')
        txtBelow.innerHTML = `<strong>클리어~!</strong>`
        console.log('ㅎㅎ')
      }
      clearBoard();
      playGame();
      return
    }
  alert('다시 도전하세요!')
}

function clearBoard() {
  while (gameBoard.hasChildNodes()) {
    gameBoard.removeChild(gameBoard.firstChild);
  }
}