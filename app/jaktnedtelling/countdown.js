cd_duration = 35_000;
cd_sections = [
    {
        description: "Er skytterene klare?",
        start: 0,
        //duration: 5000,
        bg_colour: "#045930",
        audio: new Audio("audio/start.wav"),
    }, {
        description: "KLAR",
        start: 5000,
        //duration: 5000,
        bg_colour: "#449940",
       audio: new Audio("audio/klar.wav"),
    }, {
        description: "ILD",
        start: 10_000,
        //duration: 5000,
        bg_colour: "#f4a930",
       audio: new Audio("audio/ild.wav"),
    }, {
        description: "Staaaaaaans",
        start: 33_000,
        //duration: -2000,
        bg_colour: "#e45930",
        audio: new Audio("audio/stans.wav"),
    }, {
        description: "You have broken the universe!",
        start: Number.MAX_VALUE,
        bg_colour: "#000",
    }
]

window.onload = function(){
    let start_button = document.querySelector("#button-start-countdown");
    start_button.onclick = startCountdown;
}

function startCountdown() {
    let sec_idx = 0;

    if (typeof cd_interval !== 'undefined') {
        clearInterval(cd_interval);
    }

    cd_target_time = new Date().getTime() + cd_duration;
    cd_interval = setInterval(() => {
        let time_left = cd_target_time - new Date().getTime();
        time_left = time_left < 0 ? 0 : time_left;
        let min = Math.floor((time_left / (60 * 1000)) % 60);
        let sec = Math.floor((time_left / 1000) % 60)
        let mil = Math.floor(time_left % 100)
        
        let cd_div = document.querySelector("#countdown-timer");
        cd_div.innerHTML =
            min.toString().padStart(2, '0') + ':' +
            sec.toString().padStart(2, '0') + '.' +
            mil.toString().padStart(2, '0');

        // Update section
        let time_elapsed = cd_duration - time_left;
        let section = cd_sections[sec_idx];
        if (section.start <= time_elapsed) {
            section.audio.play();

            let desc = document.querySelector("#countdown-section-desc");
            desc.innerHTML = section.description;
            
            let bg = document.querySelectorAll(".countdown-bg-colour");
            bg.forEach((e) => {
                e.style.backgroundColor = section.bg_colour;
            });
            
            sec_idx++;
        }

        if (time_left <= 0) {
            clearInterval(cd_interval);
        }
    }, 9);
}

function playAudio() {
    let audio = new Audio("audio/start.wav");
    audio.play();
}
