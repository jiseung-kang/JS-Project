const btnStart = document.querySelector('.btn-start') // 게임 시작 버튼
const gameBoard = document.querySelector('.wrap-game') // 게임판
const txtDesc = document.querySelector('.start-desc') // 게임 설명
let txtBelow = document.querySelector('.txt-below') // 스테이지 진행 정도
const size = 200;
let cardSize = 0;
let gapSize = 10;
let cardList = []
let cards = {};

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
  txtBelow.innerHTML = `<strong>${i} / 15 도전중</strong>`

  // 스테이지별 게임판의 크기 지정
  makeCard((i + 1) * (i + 1) / 2)
  makeBoard(i + 1)
  cardSize = (size - 10 * 2 - 10 * (i - 1)) / (i + 1);
}

let list = []
let code = 0;
const makeCard = (n) => {
  for (let i = 0; i < n; i++) {
    let color = `rgb( ${new Array(3).fill().map(v => Math.random() * 255).join(", ")} )`;
    list.push([code, color]);
    list.push([code, color]);
    code++;
  }
  remain = list.length;
  shuffle();
  console.log(cardList)
}

function shuffle() {
  while (true) {
    let card = list.splice(parseInt(Math.random() * (list.length)), 1)[0];
    cardList.push(card)
    cards[card[0]] = card[1]
    if (list == [] || !list.length) {
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
      // console.log(Object.keys(cards)[tmp])
      base.classList.add(cardList[tmp][0]) // 같은 카드인지 확인하기 위한 코드 넣기
      base.classList.add("card") // 카드모양
      base.style.background = cardList[tmp++][1];
      cardSize = (size / (i + 1));
      gameBoard.style.gap = "auto";
      base.style.width = `${cardSize}px`
      base.style.height = `${cardSize}px`
      // 이벤트 리스너
      console.log(base.style.background)
      base.addEventListener("click", (e) => {
        base.classList.add("flipped")
        if (!base.id)
          base.id = tmp++;
        // flip(e);
        checkCard(e);
      })
      gameBoard.append(base)
    }
  }
}

const flip = (e) => {
  setTimeout(() => {
    console.log("id", e.target.classList)
    e.target.style.background = cards[e.target.classList[0]];
    // e.target.style.transform = "rotateY(180deg)";
  }, 100)
}


let selectedCode = -1;
let cardSelected = null;
// 맞는 선택인지 확인
const checkCard = (e) => {
  if (cardSelected && cardSelected.id == e.target.id) {
    console.log("Do nothing!!")
    return;
  }
  if (selectedCode == -1) {
    selectedCode = e.currentTarget.classList[0];
    cardSelected = e.currentTarget;
    cardSelected.style.cursor = "default";
  } else {
    e.target.disabled = true;
    cardSelected.disabled = true;
    e.target.style.cursor = "default";
    cardSelected.style.cursor = "default";

    if (cardSelected.classList[0] == e.currentTarget.classList[0]) {
      e.target.style.background = "none";
      cardSelected.style.background = "none"
      remain -= 2;
    } else {
      e.target.cursor = "pointer";
      cardSelected.cursor = "pointer";
      e.target.disabled = false;
      cardSelected.disabled = false;
      e.target.classList.remove("flipped")
      cardSelected.classList.remove("flipped")
    }
    cardSelected = null;
    selectedCode = -1;
  }

  // 스테이지 클리어
  if (remain == 0) {
    console.log('clear')
    // 다음 스테이지로 넘어간다.
    clearBoard();
    i += 2;
    playGame();
  }
}

// 게임판 초기화
function clearBoard() {
  while (gameBoard.hasChildNodes()) {
    gameBoard.removeChild(gameBoard.firstChild);
  }
  cardList = []
}