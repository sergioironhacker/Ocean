let oceanCards = [
  {
    id: 1,
    name: "marine1",
    img: "assets/memoryGame/marine1.png",
  },
  {
    id: 2,
    name: "marine2",
    img: "assets/memoryGame/marine2.png",
  },
  {
    id: 3,
    name: "marine3",
    img: "assets/memoryGame/marine3.png",
  },
  {
    id: 4,
    name: "marine4",
    img: "assets/memoryGame/marine4.png",
  },
  {
    id: 5,
    name: "marine5",
    img: "assets/memoryGame/marine5.png",
  },
  {
    id: 6,
    name: "marine6",
    img: "assets/memoryGame/marine6.png",
  },
  {
    id: 7,
    name: "marine7",
    img: "assets/memoryGame/marine7.png",
  },
  {
    id: 8,
    name: "marine8",
    img: "assets/memoryGame/marine8.png",
  },
  {
    id: 9,
    name: "marine9",
    img: "assets/memoryGame/marine9.png",
  },
  {
    id: 10,
    name: "marine10",
    img: "assets/memoryGame/marine10.png",
  },
  {
    id: 11,
    name: "marine11",
    img: "assets/memoryGame/marine11.png",
  },
  {
    id: 12,
    name: "marine12",
    img: "assets/memoryGame/marine12.png",
  },
];
let oceanCards6 = [
  {
    id: 1,
    name: "marine1",
    img: "assets/memoryGame/marine1.png",
  },
  {
    id: 2,
    name: "marine2",
    img: "assets/memoryGame/marine2.png",
  },
  // {
  //   id: 3,
  //   name: "marine3",
  //   img: "assets/memoryGame/marine3.png",
  // },
  // {
  //   id: 4,
  //   name: "marine4",
  //   img: "assets/memoryGame/marine4.png",
  // },
  // {
  //   id: 5,
  //   name: "marine5",
  //   img: "assets/memoryGame/marine5.png",
  // },
  // {
  //   id: 6,
  //   name: "marine6",
  //   img: "assets/memoryGame/marine6.png",
  // }
];

const gridDiv$$ = document.querySelector('[data-function="grid"]');
const main$$ = document.querySelector("main");
// we concat the array to duplicate it
// let totalOceanCards = oceanCards.concat(oceanCards);
let totalOceanCards = oceanCards6.concat(oceanCards6);

//create an array cardsPicked to save the cards picked
let cardsPicked = [];
let cardsMatched = [];

//create a count for the attemps
let count = 0;
let score = 0;
// this variables are for the chronometer and endGame
let minutos = 0;
let segundos = 0;

//chronometer
let intervalId;
let chronoDiv$$ = document.querySelector('[data-function="chronometer"]');

// navbar
const divCount2$$ = document.querySelector('[data-function="score"]');

//compare card

//contador
const divCount$$ = document.querySelector('[data-function="attempts"]');
const score$$ = document.querySelector('[data-function="score"]');

//restart
const restartButton$$ = document.querySelector(
  '[data-function="restartButton"]'
);
const pauseButton$$ = document.querySelector('[data-function="pauseButton"]');
const startButton$$ = document.querySelector('[data-function="startButton"]');
const newGameButton$$ = document.querySelector(
  '[data-function="newGameButton"]'
);
const startLi$$ = document.querySelector('[data-function="startLi"]');

//-------------------- confeti-----------------------

// global variables
const confeti = () => {
  const confetti = document.getElementById("confetti");
  const confettiCtx = confetti.getContext("2d");
  let container,
    confettiElements = [],
    clickPosition;

  // helper
  rand = (min, max) => Math.random() * (max - min) + min;

  // params to play with
  const confettiParams = {
    // number of confetti per "explosion"
    number: 70,
    // min and max size for each rectangle
    size: { x: [5, 20], y: [10, 18] },
    // power of explosion
    initSpeed: 25,
    // defines how fast particles go down after blast-off
    gravity: 0.65,
    // how wide is explosion
    drag: 0.08,
    // how slow particles are falling
    terminalVelocity: 6,
    // how fast particles are rotating around themselves
    flipSpeed: 0.017,
  };
  const colors = [
    { front: "#3B870A", back: "#235106" },
    { front: "#B96300", back: "#6f3b00" },
    { front: "#E23D34", back: "#88251f" },
    { front: "#CD3168", back: "#7b1d3e" },
    { front: "#664E8B", back: "#3d2f53" },
    { front: "#394F78", back: "#222f48" },
    { front: "#008A8A", back: "#005353" },
  ];

  setupCanvas();
  updateConfetti();

  confetti.addEventListener("click", addConfetti);
  window.addEventListener("resize", () => {
    setupCanvas();
    hideConfetti();
  });

  // Confetti constructor
  function Conf() {
    this.randomModifier = rand(-1, 1);
    this.colorPair = colors[Math.floor(rand(0, colors.length))];
    this.dimensions = {
      x: rand(confettiParams.size.x[0], confettiParams.size.x[1]),
      y: rand(confettiParams.size.y[0], confettiParams.size.y[1]),
    };
    this.position = {
      x: clickPosition[0],
      y: clickPosition[1],
    };
    this.rotation = rand(0, 2 * Math.PI);
    this.scale = { x: 1, y: 1 };
    this.velocity = {
      x: rand(-confettiParams.initSpeed, confettiParams.initSpeed) * 0.4,
      y: rand(-confettiParams.initSpeed, confettiParams.initSpeed),
    };
    this.flipSpeed = rand(0.2, 1.5) * confettiParams.flipSpeed;

    if (this.position.y <= container.h) {
      this.velocity.y = -Math.abs(this.velocity.y);
    }

    this.terminalVelocity = rand(1, 1.5) * confettiParams.terminalVelocity;

    this.update = function () {
      this.velocity.x *= 0.98;
      this.position.x += this.velocity.x;

      this.velocity.y += this.randomModifier * confettiParams.drag;
      this.velocity.y += confettiParams.gravity;
      this.velocity.y = Math.min(this.velocity.y, this.terminalVelocity);
      this.position.y += this.velocity.y;

      this.scale.y = Math.cos(
        (this.position.y + this.randomModifier) * this.flipSpeed
      );
      this.color =
        this.scale.y > 0 ? this.colorPair.front : this.colorPair.back;
    };
  }

  function updateConfetti() {
    confettiCtx.clearRect(0, 0, container.w, container.h);

    confettiElements.forEach((c) => {
      c.update();
      confettiCtx.translate(c.position.x, c.position.y);
      confettiCtx.rotate(c.rotation);
      const width = c.dimensions.x * c.scale.x;
      const height = c.dimensions.y * c.scale.y;
      confettiCtx.fillStyle = c.color;
      confettiCtx.fillRect(-0.5 * width, -0.5 * height, width, height);
      confettiCtx.setTransform(1, 0, 0, 1, 0, 0);
    });

    confettiElements.forEach((c, idx) => {
      if (
        c.position.y > container.h ||
        c.position.x < -0.5 * container.x ||
        c.position.x > 1.5 * container.x
      ) {
        confettiElements.splice(idx, 1);
      }
    });
    window.requestAnimationFrame(updateConfetti);
  }

  function setupCanvas() {
    container = {
      w: confetti.clientWidth,
      h: confetti.clientHeight,
    };
    confetti.width = container.w;
    confetti.height = container.h;
  }

  function addConfetti(e) {
    const canvasBox = confetti.getBoundingClientRect();
    if (e) {
      clickPosition = [e.clientX - canvasBox.left, e.clientY - canvasBox.top];
    } else {
      clickPosition = [
        canvasBox.width * Math.random(),
        canvasBox.height * Math.random(),
      ];
    }
    for (let i = 0; i < confettiParams.number; i++) {
      confettiElements.push(new Conf());
    }
  }

  function hideConfetti() {
    confettiElements = [];
    window.cancelAnimationFrame(updateConfetti);
  }

  confettiLoop();
  function confettiLoop() {
    addConfetti();
    setTimeout(confettiLoop, 700 + Math.random() * 1700);
  }
};

//----------------- asideCards---------------------

const asideCards = (MatchedCards) => {
  const cardssDiv$$ = document.querySelector('[data-function="cardsReady"]');
  let singlesCard = [];
  let cardMain$$ = document.createElement("div");
  cardMain$$.innerHTML = "";

  cardssDiv$$.appendChild(cardMain$$);
  main$$.appendChild(cardssDiv$$);

  if (
    MatchedCards.find((findedCard) => findedCard.name === MatchedCards.name)
  ) {
    return;
  } else {
    MatchedCards.forEach((element) => {
      singlesCard.push(element);
    });
  }
  console.log(singlesCard);

  if (singlesCard) {
    setTimeout(() => {
      cardMain$$.classList = "cardMain fadein";

      let cardDiv$$ = document.createElement("div");
      cardDiv$$.className = `cardDiv  card__contenido`;

      let cardImg$$ = document.createElement("img");
      cardImg$$.setAttribute(
        "src",
        `${singlesCard[singlesCard.length - 1].img}`
      );
      cardImg$$.className = `cardImg`;

      let cardDiv2$$ = document.createElement("div");
      cardDiv2$$.className = `card descubierta`;
      // cardDiv2$$.innerHTML = "";
      cardDiv2$$.setAttribute(
        "data-id",
        singlesCard[singlesCard.length - 1].id
      );
      cardDiv2$$.appendChild(cardDiv$$);
      cardDiv$$.appendChild(cardImg$$);
      cardMain$$.appendChild(cardDiv2$$);
      setTimeout(() => {
        cardMain$$.classList.remove("fadein");
      }, 1500);

      //  cardDiv2$$.addEventListener("click",(event)=> flipCard(event,i))
    }, 1200);
  }
};
// ----------------- flip ---------------------

// this function select the elements whit class="card" and for each one of them give it a click event that change the event current target or the target clicked a new class called "descubierta"
const flipCard = (event, i) => {
  const card = totalOceanCards[i];
  // const cardWon = cardsMatched.find(findedCard=> findedCard.name === card.name);

  cardsPicked.push(card);
  event.target.classList.add("descubierta");
  event.target.classList.add("selected");

  if (event.target.firstChild) {
    const cardImg = event.target.firstChild.firstChild;

    cardImg.setAttribute("src", card.img);
  }
  if (cardsPicked.length === 2) {
    setTimeout(compareCards(), 50);
  }
};

//-------------------- contador ------------

const contador = () => {
  count++;

  score$$.classList.add("pulseHearth");
  divCount$$.textContent = ` ${count}`;
  // setTimeout(()=>{
  //   score$$.classList.remove("pulseHearth")
  // },500)
};

const scorePlay = () => {
  score++;
  score$$.textContent = ` ${score}`;
  endFn();
};

//------------------ comparador ----------------------

// this function compare the selected cards and compared it
const removeClass = () => {
  let firstCardDiv$$ = document.querySelectorAll(".selected");

  firstCardDiv$$[0].classList.remove("descubierta");
  firstCardDiv$$[1].classList.remove("descubierta");
  firstCardDiv$$[0].classList.remove("selected");
  firstCardDiv$$[1].classList.remove("selected");
};
const compareCards = () => {
  let firstCardDiv$$ = document.querySelectorAll(".selected");

  const firstCard = cardsPicked[0];
  const secondCard = cardsPicked[1];

  if (firstCard.id !== secondCard.id) {
    setTimeout(removeClass, 800);
    cardsPicked = [];

    //here goes the counter function
    contador();
  } else {
    setTimeout(() => {
      cardsMatched.push(cardsPicked[0]);
      firstCardDiv$$[0].classList.remove("selected");
      firstCardDiv$$[1].classList.remove("selected");
      firstCardDiv$$[0].classList.add("animati");
      firstCardDiv$$[1].classList.add("animati");
      // firstCardDiv$$[0].hidden = true;
      // firstCardDiv$$[1].hidden = true;
      cardsPicked = [];
      setTimeout(asideCards(cardsMatched), 5000);
      contador();
      scorePlay();
    }, 900);
  }
  // console.log(cardsPicked);
};

//--------------------- chronometer----------------

const chronometer = () => {
  let minutos = 0;
  let segundos = 0;
  if (score === 0) {
    intervalId = setInterval(() => {
      segundos++;
      if (segundos < 10) {
        chronoDiv$$.textContent = `0${minutos}:0${segundos}`;
      } else if (segundos >= 10) {
        chronoDiv$$.textContent = `0${minutos}:${segundos}`;
        if (segundos > 59) {
          minutos++;
          segundos = 0;
          chronoDiv$$.textContent = `0${minutos}:0${segundos}`;
        }
      } else if (minutos > 9) {
        minutos++;
        chronoDiv$$.textContent = `${minutos}:0${segundos}`;
      }
    }, 1000);
  } else {
    clearInterval(intervalId);
  }
};

//----------------endGame-------------------

const endGame = () => {
  main$$.innerHTML = "";

  let endDiv$$ = document.createElement("div");
  endDiv$$.classList = "endDiv fadeInFoward";
  endDiv$$.id = "endDiv";

  let endImg$$ = document.createElement("img");
  endImg$$.classList = "endImg";
  endImg$$.setAttribute("src", "./assets/memoryGame/endGame.png");

  const canva = document.createElement("canvas");
  canva.id = "confetti";

  const nextLvlBtn$$ = document.createElement("button");
  nextLvlBtn$$.setAttribute("type", "button");
  nextLvlBtn$$.classList = "nextLvlBtn btn btn-primary";
  nextLvlBtn$$.id = "nextLvlBtn";
  nextLvlBtn$$.innerText = "Next level ¡Hurray! ";
  nextLvlBtn$$.onclick = newGame;

  const tryAgainBtn$$ = document.createElement("button");
  tryAgainBtn$$.setAttribute("type", "button");
  tryAgainBtn$$.classList = "tryAgainBtn btn btn-primary";
  tryAgainBtn$$.id = "tryAgainBtn";
  tryAgainBtn$$.innerText = "See new cards :)";
  tryAgainBtn$$.onclick = newGame;
  endDiv$$.appendChild(canva);
  endDiv$$.appendChild(endImg$$);
  endDiv$$.appendChild(tryAgainBtn$$);
  endDiv$$.appendChild(nextLvlBtn$$);
  main$$.appendChild(endDiv$$);
  confeti();

  const cardssDiv$$ = document.querySelector('[data-function="cardsReady"]');
  if (cardssDiv$$) {
    cardssDiv$$.style.display = "none";
  }
};

const endFn = () => {
  if (score === oceanCards6.length) {
    chronometer();
    endGame();
  }
};

//------------------restart----------------

startLi$$.style.display = "none";
pauseButton$$.style.display = "none";

const restart = () => {
  const confetti$$ = document.getElementById("confetti");
  const endDiv$$ = document.getElementById("endDiv");

  clearInterval(intervalId);
  segundos = 0;
  minutos = 0;
  count = 0;
  score = 0;
  divCount$$.textContent = ` ${count}`;
  divCount2$$.textContent = ` ${score}`;
  // cardssDiv$$.style.display = "block"
  onInit();
};

const pause = () => {
  clearInterval(intervalId);
  startLi$$.style.display = "block";
};
pauseButton$$.onclick = pause;

const newGame = () => {
  // this function sort sort the array and with the math.random  is sort randomdly
  totalOceanCards.sort(() => 0.5 - Math.random());
  restart();
  pauseButton$$.style.display = "block";
};
newGameButton$$.onclick = newGame;

const start = () => {
  chronometer();
  startLi$$.style.display = "none";
};
startButton$$.onclick = start;

// ---------------- inicio   --------------------

//this function create the table with the cards

const createTable = (cardArray) => {
  main$$.innerHTML = "";
  const divCards$$ = document.createElement("div");
  divCards$$.setAttribute("data-function", "cardsReady");
  divCards$$.classList = "cardsReady";

  const divGrid$$ = document.createElement("div");
  divGrid$$.setAttribute("data-function", "grid");
  divGrid$$.classList = "mesi";

  main$$.appendChild(divCards$$);
  main$$.appendChild(divGrid$$);

  let divTable$$ = document.createElement("div");
  divTable$$.className = `tableDiv mesa`;
  divGrid$$.appendChild(divTable$$);

  for (let i = 0; i < cardArray.length; i++) {
    const cardInfo = cardArray[i];
    // console.log(i);

    let cardDiv$$ = document.createElement("div");
    cardDiv$$.className = `cardDiv card__contenido`;

    let cardImg$$ = document.createElement("img");
    cardImg$$.setAttribute("src", ``);
    cardImg$$.className = `cardImg`;

    let cardDiv2$$ = document.createElement("div");
    cardDiv2$$.className = `card`;
    cardDiv2$$.setAttribute("data-id", cardInfo.id);
    cardDiv2$$.appendChild(cardDiv$$);
    cardDiv$$.appendChild(cardImg$$);
    divTable$$.appendChild(cardDiv2$$);
    cardDiv2$$.addEventListener("click", (event) => flipCard(event, i));
  }
};
//this is our initializator function

const onInit = () => {
  createTable(totalOceanCards);
  chronometer();
};

// onInit();