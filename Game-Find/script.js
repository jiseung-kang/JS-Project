// 1~5 스테이지 : 3*3
//6~10 스테이지 : 4*4
//11~15 스테이지 : 5*5

const btnStart = document.querySelector('.btn-start') // 게임 시작 버튼
const gameBoard = document.querySelector('.wrap-game') // 게임판
const txtDesc = document.querySelector('.start-desc') // 게임 설명
let txtBelow = document.querySelector('.txt-below') // 스테이지 진행 정도

// 게임판내 랜덤 위치 변수
let randomR = 0
let randomC = 0

// 시작버튼을 누르면 게임 시작
btnStart.addEventListener('click', () => {
  btnStart.style.display = "none";
  txtDesc.style.display = "none"
  gameBoard.style.display = "grid";
  playGame();
})

// 현재 진행중인 스테이지
let i = 1;

function playGame() {
  // 보너스 스테이지, 스테이지 진행 상황
  if (i == 5 || i == 8 || i == 12 || i == 14) {
    txtBelow.innerHTML = `<strong>BONUS STAGE</strong>`
  } else {
    txtBelow.innerHTML = `<strong>${i} / 15 도전중</strong>`
  }

  // 스테이지별 게임판의 크기 지정
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

// 스테이지별 N*N 게임판 생성
const makeBoard = (n) => {
  let clsName = 'bg-' + i; // 스테이지별 사용되는 이미지를 불러올 클래스명
  let degree = 360 / (n * n) // 게임판의 그림 개수만큼의 각도 계산
  gameBoard.style.gridTemplateColumns = `repeat(${n}, 1fr)`; // N*N Grid

  // 다른 그림을 지정할 랜덤 위치
  randomR = parseInt(Math.random() * n)
  randomC = parseInt(Math.random() * n)

  // degree * tmp 각도로 돌리면서 그림을 N*N 게임판에 넣는다
  let tmp = 1
  for (let c = 0; c < n; c++) {
    for (let r = 0; r < n; r++) {
      // 기본 이미지에 대해 버튼 요소 생성
      const base = document.createElement("button")
      base.classList.add("btn")
      base.classList.add(clsName)
      // 이벤트 리스너를 추가. 버튼을 누를 때 정답인지 확인한다
      base.addEventListener("click", (e) => {
        checkCorrect(e)
      })
      // 다른 그림을 넣어야할 위치
      if (c == randomC && r == randomR) {
        // 보너스 스테이지에서는 색깔이 반전된 이미지가 주어진다.
        if (i == 5 || i == 8 || i == 12 || i == 14) {
          base.classList.add("invert")
        } else // 다른 그림은 좌우가 반전된 이미지
          base.classList.add("flip")
      } else { // 돌려서 만들 수 있는 이미지는 같은 이미지로 생각한다
        base.style.transform = `rotate(${tmp++ * degree}deg)`; // 각도 변경
      }
      // 돌린 이미지를 랜덤으로 앞, 뒤에서 추가한다.
      if ((parseInt(Math.random() * 2)) == 1) {
        gameBoard.append(base)
      } else {
        gameBoard.prepend(base)
      }
    }
  }
}

// 맞는 선택인지 확인
const checkCorrect = (e) => {
  // 클릭한 요소의 클래스리스트를 순회한다.
  for (let c of e.currentTarget.classList)
    // 반전된 이미지라면 정답
    if (c == "flip" || c == "invert") {
      i++;
      // 모든 스테이지 클리어
      if (i > 15) {
        alert('클리어~!')
        txtBelow.innerHTML = `<strong>클리어~!</strong>`
        console.log('ㅎㅎ')
      }
      // 다음 스테이지로 넘어간다.
      clearBoard();
      playGame();
      return
    }
  alert('다시 도전하세요!')
}

// 게임판 초기화
function clearBoard() {
  while (gameBoard.hasChildNodes()) {
    gameBoard.removeChild(gameBoard.firstChild);
  }
}

let time = 0
const turning = setInterval(() => {
  gameBoard.style.transform = `rotate(${time}deg)`;
  time += i * (.5);
}, 50)