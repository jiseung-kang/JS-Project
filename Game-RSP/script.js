// 화면에서 가위바위보 출력
const enemyPlay = document.querySelector('#enemy-choose');

let options = ['🤘', '👊', '🖖']; // 가위바위보
let values = [-1, 0, 1]; // 지는 경우, 비기는 경우, 이기는 경우 점수
let enemyChoice = 0; // 적의 선택
let userChoice = 0; // 유저의 선택

// 유저가 선택하는 가위바위보 버튼
const userChoiceS = document.querySelector('#user-s');
const userChoiceR = document.querySelector('#user-r');
const userChoiceP = document.querySelector('#user-p');
// 가위바위보 결과를 출력할 태그
const playResult = document.querySelector('.play');

// 다시하기 버튼
const btnReset = document.querySelector('.btn-reset');
// 결과 점수를 출력할 태그
const userResult = document.querySelector('.res-score');

// 점수 초기화
let score = 0;

// 화면에서 enemy 선택 출력
const playGame = () => {
	enemyPlay.innerHTML = randomChoice();
};

// enemy 선택 업데이트
function randomChoice() {
	if (enemyChoice == options.length - 1) {
		enemyChoice = 0;
	} else {
		enemyChoice++;
	}
	return options[enemyChoice];
}

// 가위바위보 게임
const rspGame = (choice) => {
	// 유저의 인풋 저장
	userChoice = choice;
	// 반복 중지
	clearInterval(startGame);

	// 비긴 경우
	if (enemyChoice == userChoice) {
		alert(
			`Enemy : ${options[enemyChoice]} You : ${options[userChoice]} ➡️ [${values[0]}]점을 획득합니다.`
		);
		getScore(values[0]);
	}
	// 이기거나 진 경우 (어떤 경우가 이긴 경우인지는 value배열이 결정한다.)
	else if ((enemyChoice == 0 && userChoice == 1) || (enemyChoice == 1 && userChoice == 2)) {
		alert(
			`Enemy : ${options[enemyChoice]} You :  ${options[userChoice]} ➡️ [${values[1]}]점을 획득합니다.`
		);
		getScore(values[1]);
	} else {
		alert(
			`Enemy : ${options[enemyChoice]} You :  ${options[userChoice]} ➡️ [${values[2]}]점을 획득합니다.`
		);
		getScore(values[2]);
	}
};

// 획득한 점수 반영
const getScore = (s) => {
	score += s;
	userResult.textContent = score;
	playResult.textContent = `Enemy : ${options[enemyChoice]} You : ${options[userChoice]} ➡️  [${values[0]}] 점을 획득했습니다.`;
	// 게임을 다시 시작한다.
	startGame = setInterval(playGame, 100);
};

// 게임 다시하기. 점수를 초기화하고 게임 규칙을 변경한다.
function resetGame() {
	score = 0;
	getScore(0);
	updateRule();
}

// 게임 규칙 변경
function updateRule() {
	values.push(values[0]);
	values.shift();
}

// 게임을 시작
let startGame = setInterval(playGame, 100);

// 유저의 인풋별 게임 진행
userChoiceS.addEventListener('click', () => rspGame(0));
userChoiceR.addEventListener('click', () => rspGame(1));
userChoiceP.addEventListener('click', () => rspGame(2));

// 다시하기
btnReset.addEventListener('click', () => resetGame());
