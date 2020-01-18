import "./styles.css";

const wackAMole = (() => {
  const holes = document.querySelectorAll(".hole");
  const score = document.getElementById("score");
  const moles = document.querySelectorAll(".mole");
  let lasthole;
  let setFinish;
  let start = false;
  let hits = 0;

  const _randomTime = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const _randomHoles = holes => {
    const totalItems = holes.length;
    const item = Math.floor(Math.random() * totalItems);
    // just to make sure the mole doesnt come up in the same hole twice in a row
    if (item === lasthole) {
      _randomHoles(holes);
    }
    lasthole = item;
    return holes[item];
  };

  const _peepMole = () => {
    const time = _randomTime(300, 1000);
    const hole = _randomHoles(holes);
    const mole = hole.firstElementChild;
    console.log(hole);
    mole.classList.add("show");

    setFinish = setTimeout(() => {
      mole.classList.remove("show");
      _peepMole();
    }, time);
  };

  const stopGame = () => {
    start = false;
    _clear();
    _toggleButton();
    clearTimeout(setFinish);
  };

  // clear the moels once the stop button is pressed
  const _clear = () => {
    moles.forEach(mole => {
      mole.classList.remove("show");
    });
    hits = 0;
    score.textContent = hits;
  };
  // toggle start and stop once pressed
  const _toggleButton = () => {
    if (start) document.querySelector(".button").textContent = "STOP";
    else document.querySelector(".button").textContent = "START";
  };

  const startGame = () => {
    if (!start) {
      start = true;
      _peepMole();
      _toggleButton();
      setTimeout(() => {
        stopGame();
      }, 20000);
    } else {
      stopGame();
      _toggleButton();
    }
  };

  const bunkMoleHead = () => {
    hits++;
    console.log("hits", hits);
    score.innerHTML = hits;
  };

  return {
    start: startGame,
    stop: stopGame,
    bunk: bunkMoleHead
  };
})();

document.querySelector(".button").addEventListener("click", function() {
  wackAMole.start();
});

document.querySelector(".hole_continer").addEventListener("click", function(e) {
  //checking if you are a cheater
  if (e.isTrusted && e.target.className === "mole show") {
    wackAMole.bunk();
  }
});
