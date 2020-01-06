const $start = document.querySelector("#start"),
    $game = document.querySelector("#game"),
    $time = document.querySelector("#time"),
    $result = document.querySelector("#result"),
    $timeHeader = document.querySelector("#time-header"),
    $resultHeader = document.querySelector("#result-header"),
    $gameTime = document.querySelector("#game-time");

var score = 0;
var isGameStarted = false;
var arrColors = [ "red", "blue", "green", "orange", "aqua", "violet", "chartreuse", "deeppink", "gold" ];

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input',setGameTime);

function show($el){
    $el.classList.remove("hide");
}

function hide($el){
    $el.classList.add("hide");
}

function startGame(){
    $gameTime.setAttribute('disabled',true);
    score = 0;
    setGameTime();

    isGameStarted = true;
    $game.style.backgroundColor = "#fff";
    hide($start);

    let interval = setInterval(function(){
        let time = parseFloat($time.textContent);
        if(time <=0 ){
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }
        console.log('interval', $time.textContent );
    }, 100);

    renderBox();
}

function setGameScore(){
    $result.textContent = score.toString();
}

function setGameTime(){
    let time = parseInt($gameTime.value);
    $time.textContent = time.toFixed(1);
    show($timeHeader);
    hide($resultHeader);
}

function endGame(){
    isGameStarted = false;
    setGameScore();
    $gameTime.removeAttribute('disabled');
    show($start);
    $game.style.backgroundColor = "#ccc";
    $game.innerHTML = "";
    hide($timeHeader);
    show($resultHeader);
}

function renderBox(){
    $game.innerHTML = "";
    const box = document.createElement("div");
    const boxSize = getRandom(30,100);
    const gameSize = $game.getBoundingClientRect();//получение различных размеров поля
    const maxTop = gameSize.height - boxSize;
    const maxLeft = gameSize.width - boxSize;

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = arrColors[Math.floor(Math.random()* (arrColors.length))];
    box.style.top = getRandom(0,maxTop) + 'px';
    box.style.left = getRandom(0,maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', true);

    $game.insertAdjacentElement('afterbegin', box);

}

function handleBoxClick(event) {
    if(isGameStarted) {
        if(event.target.dataset.box) {
            score++;
            renderBox();
        }
    }
    return "";
    
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}