// Estado geral do jogo
const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,  // 1000ms = 1s
    hitPosition: null,   // id do quadrado com inimigo
    result: 0,           // pontuação
    CurretTime: 60,
  },
  actions:{
    timerId: setInterval(randomSquare,1000),
    CountDowTimerId: setInterval(CountDow,1000)
  }
};

function CountDow(){
    state.values.CurretTime--;
    state.view.timeLeft.textContent = state.values.CurretTime;

    if (state.values.CurretTime <= 0) {
        clearInterval(state.actions.CountDowTimerId)
        clearInterval(state.actions.timerId)
        alert("Game Over! O seu resultado foi: + state.values.result");
    }
}
function playSound(){
    let audio = new Audio("./src/audios/hit.m4a")
    audio.volume = 0.2;
    audio.play();
}
// Sorteia um quadrado e marca como inimigo
function randomSquare() {
  // limpa todos
  state.view.squares.forEach((square) => square.classList.remove("enemy"));

  // escolhe um índice aleatório
  const randomIndex = Math.floor(Math.random() * state.view.squares.length);
  const square = state.view.squares[randomIndex];

  // aplica inimigo e salva a posição correta
  square.classList.add("enemy");
  state.values.hitPosition = square.id;
}

// Move o inimigo periodicamente
function moveEnemy() {
  // garante que não há dois intervals
  if (state.values.timerId) clearInterval(state.values.timerId);
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);

}

// Clique nos quadrados (conta ponto se acertar o inimigo)
function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        // evita pontuar duas vezes no mesmo alvo
        state.values.hitPosition = null;
        playSound();
      }
    });
  });
}

// Inicialização
function initialize() {
  randomSquare();  // já mostra um inimigo ao iniciar
  moveEnemy();
  addListenerHitBox();
}

initialize();
