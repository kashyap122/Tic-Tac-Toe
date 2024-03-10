let player1NameInGame;
let player2NameInGame;
let timeLeft = 60;
let timerInterval;
let btnRef = document.querySelectorAll(".boardCell");
let msgRef = document.getElementById("message");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.querySelector(".popup__restart-btn");
let restartBtn = document.querySelector(".game-restart-btn");
let xTurn = true;
let count = 0;

function startButton() {
    let playerName1 = document.getElementById("player1").value;
    let playerName2 = document.getElementById("player2").value;

    console.log(playerName1);   
    console.log(playerName2);

    if (playerName1 === "" || playerName2 === "") {
        alert("Player names are required!");
    } else {
        window.location.href = "ticTacToe.html?player1=" + encodeURIComponent(playerName1) + "&player2=" + encodeURIComponent(playerName2);
    }
}

function startTicTacToe() {
    const urlParams = new URLSearchParams(window.location.search);
    const playerName1 = urlParams.get('player1');
    const playerName2 = urlParams.get('player2');

    console.log(playerName1);
    console.log(playerName2);

    player1NameInGame = document.getElementById("nameOfP1").innerHTML = playerName1;
    player2NameInGame = document.getElementById("nameOfP2").innerHTML = playerName2;
}

function startTimer() {
    timerInterval = setInterval(function () {
        document.getElementById("gameTimer").textContent = timeLeft;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            alert("Time's up Game Over!");
            newGame();
        }
    }, 1000);
}
startTimer();

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    popupRef.classList.remove("hide");
};

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    popupRef.classList.add("hide");
};

const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = player1NameInGame + " Wins";
    } else {
        msgRef.innerHTML = player2NameInGame + " Wins";
    }
};
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "It's a Draw";
};

function newGame() {
    count = 0;
    timeLeft = 60;
    document.getElementById("gameTimer").textContent = timeLeft;
    enableButtons();
    clearInterval(timerInterval);
    startTimer();
}

function exitGame() {
    window.location.href = "index.html";
}

const winChecker = () => {
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];

        if (element1 != "" && element2 != "" && element3 != "" && element1 == element2 && element2 == element3) {
            winFunction(element1);
        }
    }
};

btnRef.forEach((element) => {
    element.style.height = "90px";
    element.style.width = "90px";
    element.style.color = "#1d1e3d";
    element.style.fontSize = "30px";
    element.style.fontWeight = "bold";

    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            element.innerText = "X";
        } else {
            xTurn = true;
            element.innerText = "O";
        }
        element.disabled = true;
        count++;
        if (count == 9) {
            drawFunction();
        }
        winChecker();
    });
});