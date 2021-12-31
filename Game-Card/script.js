const btnStart = document.querySelector('.btn-start') // 게임 시작 버튼
const gameBoard = document.querySelector('.wrap-game') // 게임판
const txtDesc = document.querySelector('.start-desc') // 게임 설명
let txtBelow = document.querySelector('.txt-below') // 스테이지 진행 정도
const size = 200;
let cardSize = 0;
let gapSize = 10;
let cardList = []

// 시작버튼을 누르면 게임 시작
btnStart.addEventListener('click', () => {
  btnStart.style.display = "none";
  txtDesc.style.display = "none"
  gameBoard.style.display = "grid";
  playGame();
})

// 현재 진행중인 스테이지
let i = 1;
// 남은 카드 개수
let remain = 100;

function playGame() {
  txtBelow.innerHTML = `<strong>${i}번째 도전중</strong>`

  // 스테이지별 게임판의 크기 지정
  makeCard((i + 1) * (i + 1) / 2)
  makeBoard(i + 1)
  cardSize = (size - 10 * 2 - 10 * (i - 1)) / (i + 1);
}

let sorted = []
let code = 0;
const makeCard = (n) => {
  for (let i = 0; i < n; i++) {
    let color = `rgb( ${new Array(3).fill().map(v => parseInt(Math.random() * 255)).join(", ")} )`;
    sorted.push([code, color]);
    sorted.push([code, color]);
    code++;
  }
  // 카드 개수 갱신
  remain = sorted.length;
  shuffle();
}

function shuffle() {
  while (true) {
    let card = sorted.splice(parseInt(Math.random() * (sorted.length)), 1)[0];
    cardList.push(card)
    if (sorted == [] || !sorted.length) {
      break;
    }
  }
}

// 스테이지별 N*N 게임판 생성
const makeBoard = (n) => {
  gameBoard.style.gridTemplateColumns = `repeat(${n}, 1fr)`; // N * N Grid
  // N*N 게임판에 카드 생성
  let tmp = 0
  for (let c = 0; c < n; c++) {
    for (let r = 0; r < n; r++) {
      // 기본 이미지에 대해 버튼 요소 생성
      const base = document.createElement("button")
      base.id = tmp;
      base.classList.add(cardList[base.id][0]) // 짝인지 확인하기 위한 코드 넣기
      base.classList.add("card") // 카드모양
      cardSize = parseInt(size / (i + 1));
      gameBoard.style.gap = "auto";
      base.style.width = `${cardSize}px`
      base.style.height = `${cardSize}px`
      // 이벤트 리스너
      base.addEventListener("click", (e) => {
        selected.push(e.currentTarget)
        flip(e)
      });
      gameBoard.append(base);
      tmp++;
    }
  }
}

const flip = (e) => {
  // 클릭한 카드의 색깔 보여주기
  e.target.style.background = cardList[e.target.id][1];

  if (selected.length == 2) {
    let selectedCard = checkCard(e);
    if (selectedCard[0].classList[selectedCard[0].classList.length - 1] == "flipped") {
      back(selectedCard[0], "none")
      back(selectedCard[1], "none")
      selectedCard[0].style.cursor = "default";
      selectedCard[1].style.cursor = "default";
      selectedCard[0].disabled = "true";
      selectedCard[1].disabled = "true"
    } else {
      back(selectedCard[0], "pink")
      back(selectedCard[1], "pink")
    }
    selected = []
  } else {
    back(e.target, "pink")
  }
}

const back = (target, color) => {
  setTimeout(() => {
    target.style.background = color;
  }, 500)
}

// 맞는 선택인지 확인
let selected = []
const checkCard = (e) => {
  // 같은 카드를 선택했다!
  if (selected[0].id == selected[1].id) {
    console.log("Do nothing!!")
  }
  // 같은 쌍이라면
  else if (selected[0].classList[0] == selected[1].classList[0]) {
    selected[0].classList.add("flipped")
    selected[1].classList.add("flipped")
    // 남은 카드의 개수 2개 제거하기
    remain -= 2;
  } else {
    // 다른 쌍이라면
    selected[0].classList.remove("flipped")
    selected[1].classList.remove("flipped")
    clearTimeout(back)
  }
  // 스테이지 클리어
  if (remain <= 0) {
    // 다음 스테이지로 넘어간다.
    clearBoard();
    i += 2;
    playGame();
  }
  return selected;
}

// 게임판 초기화
function clearBoard() {
  while (gameBoard.hasChildNodes()) {
    gameBoard.removeChild(gameBoard.firstChild);
  }
  cardList = []
}