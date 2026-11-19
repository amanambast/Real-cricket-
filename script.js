let runs = 0;
let wickets = 0;
let balls = 0;
let maxOvers = 20;
let gameStarted = false;

function startGame() {
    runs = 0;
    wickets = 0;
    balls = 0;

    maxOvers = Number(document.getElementById("oversLimit").value);

    gameStarted = true;

    document.getElementById("status").innerText =
        "MATCH STARTED!";

    updateScore();
}

function hitBall(type) {

    if (!gameStarted) {
        alert("Please start the match first!");
        return;
    }

    if (balls >= maxOvers * 6 || wickets >= 10) {
        gameStarted = false;
        return;
    }

    let random = Math.random();
    let result = 0;

    if (type === "DEFEND") {
        result = random < 0.8 ? 0 : 1;
    }

    else if (type === "NORMAL") {
        result = Math.floor(Math.random() * 5);
    }

    else if (type === "POWER") {
        if (random < 0.25) result = 6;
        else if (random < 0.50) result = 4;
        else if (random < 0.80) result = 1;
        else result = 0;
    }

    if (Math.random() < 0.06 && type !== "DEFEND") {
        wickets++;
        document.getElementById("status").innerText = "WICKET!";
    } else {
        runs += result;

        document.getElementById("status").innerText =
            result === 6 ? "SIXER! 🚀" :
            result === 4 ? "FOUR! 🔥" :
            result + " RUNS";
    }

    balls++;

    updateScore();

    if (balls >= maxOvers * 6 || wickets >= 10) {
        gameStarted = false;
        document.getElementById("status").innerText =
            "INNINGS COMPLETE!";
    }
}

function updateScore() {
    document.getElementById("score").innerText =
        runs + " / " + wickets;

    document.getElementById("overs").innerText =
        Math.floor(balls / 6) + "." + (balls % 6);
}

function resetGame() {
    gameStarted = false;
    runs = 0;
    wickets = 0;
    balls = 0;

    updateScore();

    document.getElementById("status").innerText =
        "READY TO PLAY";
}
