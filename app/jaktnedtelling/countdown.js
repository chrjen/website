window.onload = function(){
    let start_button = document.querySelector("#button-start-countdown");
    start_button.onclick = playAudio;
}

function playAudio() {
    let audio = new Audio("audio/start.wav");
    audio.play();
}
