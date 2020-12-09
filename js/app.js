var app = {
  player: {
    x: 0,
    y: 0,
    direction: "right",
  },
  targetCell: {
    x: 5,
    y: 3,
  },
  gameOver: false,
  init: function () {
    app.drawBoard();
    app.listenKeyboardEvents();
    app.moveCounter();
    app.drawScore();
    app.control();
  },
  drawScore: function () {
    scoreElement = document.getElementById("score");
    scoreElement.innerHTML = "Rejoins la zone verte";
    document.addEventListener("keyup", function (e) {
      if (app.gameOver) {
        scoreElement.innerHTML =
          "Bravo!! </br> Partie terminé en : " + app.counter;
      } else if (e.keyCode === 37 || app.control.turnLeft) {
        scoreElement.innerHTML = "Nombres de mouvement : " + app.counter;
      } else if (e.keyCode === 39) {
        scoreElement.innerHTML = "Nombres de mouvement : " + app.counter;
      } else if (e.keyCode === 32) {
        scoreElement.innerHTML = "Nombres de mouvement : " + app.counter;
      }
    });
  },

  control: function () {
    var controlElement = document.getElementById("control");
    var turnLeft = document.querySelector(".btnLeft");
    var turnRight = document.querySelector(".btnRight");
    var turnForward = document.querySelector(".btnForward");

    turnLeft.addEventListener("click", function (event) {
      if (app.gameOver) {
        console.log("fini");
      } else {
        turnLeft = app.turnLeft();
        app.counter++;
        scoreElement.innerHTML = "Nombres de mouvement : " + app.counter;
      }
    });
    turnForward.addEventListener("click", function (event) {
      if (app.gameOver) {
        scoreElement.innerHTML =
          "Bravo!! </br> Partie terminé en : " + app.counter;
      } else {
        turnForward = app.moveForward();
        app.counter++;
        scoreElement.innerHTML = "Nombres de mouvement : " + app.counter;
      }
    });
    turnRight.addEventListener("click", function (event) {
      if (app.gameOver) {
        scoreElement.innerHTML =
          "Bravo!! </br> Partie terminé en : " + app.counter;
      } else {
        turnRight = app.turnRight();
        app.counter++;
        scoreElement.innerHTML = "Nombres de mouvement : " + app.counter;
      }
    });
  },
  drawBoard: function () {
    boardElement = document.getElementById("board");
    for (let i = 0; i < 4; i++) {
      rowElement = document.createElement("div");
      rowElement.className = "row";
      boardElement.appendChild(rowElement);
      for (let j = 0; j < 6; j++) {
        cellElement = document.createElement("div");
        cellElement.className = "cell";
        rowElement.appendChild(cellElement);
        if (j === app.targetCell.x && i === app.targetCell.y) {
          cellElement.className = "targetCell";
        }
        if (i === app.player.x && j === app.player.y) {
          cellElement.className = "player";
        }
      }
    }
    if (app.player.direction === "down") {
      document.querySelector(".player").style.backgroundPosition =
        "2.5px 288px";
    } else if (app.player.direction === "left") {
      document.querySelector(".player").style.backgroundPosition =
        "2.5px 218px";
    } else if (app.player.direction === "up") {
      document.querySelector(".player").style.backgroundPosition = "2.5px 68px";
    } else if (app.player.direction === "right") {
      document.querySelector(".player").style.backgroundPosition =
        "2.5px 142px";
    }
  },
  clearBoard: function () {
    boardElement.innerHTML = "";
  },
  redrawBoard: function () {
    app.clearBoard();
    app.drawBoard();
  },
  turnRight: function () {
    if (app.gameOver) {
      console.log("c'est fini wesh");
    } else if (app.player.direction === "right") {
      app.player.direction = "down";
    } else if (app.player.direction === "down") {
      app.player.direction = "left";
    } else if (app.player.direction === "left") {
      app.player.direction = "up";
    } else {
      app.player.direction = "right";
    }
    app.redrawBoard();
  },
  turnLeft: function () {
    app.turnRight.called = true;
    if (app.gameOver) {
      console.log("c'est fini wesh");
    } else if (app.player.direction === "right") {
      app.player.direction = "up";
    } else if (app.player.direction === "up") {
      app.player.direction = "left";
    } else if (app.player.direction === "left") {
      app.player.direction = "down";
    } else {
      app.player.direction = "right";
    }
    app.redrawBoard();
  },
  moveForward: function () {
    if (app.gameOver) {
      console.log("fini");
    } else if (app.player.direction === "right" && app.player.y < 5) {
      app.player.y++;
    } else if (app.player.direction === "up" && app.player.x > 0) {
      app.player.x--;
    } else if (app.player.direction === "left" && app.player.y > 0) {
      app.player.y--;
    } else if (app.player.direction === "down" && app.player.x < 3) {
      app.player.x++;
    }
    app.isGameOver();
    app.redrawBoard();
  },
  listenKeyboardEvents: function () {
    document.addEventListener("keyup", function (e) {
      if (app.gameOver) {
        console.log("fini");
      } else if (e.keyCode === 37) {
        app.turnLeft();
      } else if (e.keyCode === 39) {
        app.turnRight();
      } else if (e.keyCode === 32) {
        app.moveForward();
      }
    });
  },
  isGameOver: function () {
    var scoreElement = document.getElementById("score");
    if (
      app.player.x === app.targetCell.y &&
      app.player.y === app.targetCell.x
    ) {
      app.gameOver = true;
      alert("Bravo!! Partie terminé en : " + (1 + app.counter));
      scoreElement.innerHTML =
        "Bravo!! </br> Partie terminé en : " + app.counter;
    }
  },
  counter: 0,
  moveCounter: function () {
    document.addEventListener("keyup", function (e) {
      if (app.gameOver) {
        console.log("fini");
      } else if (e.keyCode === 37) {
        app.counter++;
      } else if (e.keyCode === 39) {
        app.counter++;
      } else if (e.keyCode === 32) {
        app.counter++;
      }
    });
  },
};

document.addEventListener("DOMContentLoaded", app.init);

var replay = document.querySelector(".replay");
replay.addEventListener("click", function () {
  app.player.x = 0;
  app.player.y = 0;
  app.redrawBoard();
  app.gameOver = false;
  app.counter = 0;
  scoreElement = document.getElementById("score");
  scoreElement.innerHTML = "Rejoins la zone verte";
});
