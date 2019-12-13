cd_audio = new Audio();
cd_sections = [
    {
        duration: 10_000,
        seq: [
            {
                description: "Klargjør våpnene",
                start: 0,
                fg_colour: "#000000",
                bg_colour: "#ffffff",
                audio: new Audio(),
            }
        ]
    },
    {
        duration: 10_000,
        seq: [
            {
                description: "Er skytterene klare?",
                start: 0,
                fg_colour: "#ffffff",
                bg_colour: "#044910",
                audio: new Audio("audio/klar.wav"),
            }, {
                description: "KLAR",
                start: 5000,
                fg_colour: "#ffffff",
                bg_colour: "#448950",
                audio: new Audio("audio/klar.wav"),
            }
        ],
    },
    {
        duration: 15_000,
        seq: [
            {
                description: "ILD",
                start: 0,
                fg_colour: "#000000",
                bg_colour: "#f4a930",
                audio: new Audio("audio/ild.wav"),
            }, {
                description: "Staaaaaaans",
                start: -2000,
                fg_colour: "#000000",
                bg_colour: "#e45930",
                audio: new Audio("audio/stans.wav"),
            }
        ]
    }
]

window.onload = function(){
    start_button = document.querySelector("#button-start-countdown");
    stop_button = document.querySelector("#button-stop-countdown");
    seconds_setting = document.querySelector("#countdown-duration");
    pre_count_setting = document.querySelector("#countdown-skip");
    start_button.onclick = startCountdown;
    stop_button.onclick = stopCountdown;
}

function startCountdown() {
    start_button.disabled = true;
    stop_button.disabled = false;

    let sec_idx = 0;
    let seq_idx = 0;

    if (typeof cd_interval !== 'undefined') {
        clearInterval(cd_interval);
    }

    // Use settings values to make changes.
    cd_sections[2].duration =  seconds_setting.value * 1000;
    if (!pre_count_setting.checked) {
        sec_idx = 1;
    }

    cd_duration = cd_sections[sec_idx].duration;
    cd_target_time = new Date().getTime() + cd_duration;
    cd_interval = setInterval(() => {
        let time_left = cd_target_time - new Date().getTime();
        time_left = time_left < 0 ? 0 : time_left;
        let min = Math.floor((time_left / (60 * 1000)) % 60);
        let sec = Math.floor((time_left / 1000) % 60)
        let cent = Math.floor((time_left / 10) % 100)
        
        let cd_div = document.querySelector("#countdown-timer");
        cd_div.innerHTML =
            min.toString().padStart(2, '0') + ':' +
            sec.toString().padStart(2, '0') + '.' +
            cent.toString().padStart(2, '0');

        // Update section
        if (seq_idx < cd_sections[sec_idx].seq.length) {

            let time_elapsed = cd_duration - time_left;
            let seq = cd_sections[sec_idx].seq[seq_idx];
            let start = seq.start;
            start = start < 0 ? cd_sections[sec_idx].duration + start : start;

            if (start <= time_elapsed) {
                cd_audio.pause();
                cd_audio.currentTime = 0;
                cd_audio = seq.audio;
                cd_audio.play();
    
                let desc = document.querySelector("#countdown-section-desc");
                desc.innerHTML = seq.description;
                
                let bg = document.querySelectorAll(".bg-colour");
                bg.forEach((e) => {
                    e.style.backgroundColor = seq.bg_colour;
                });
    
                let fg = document.querySelectorAll(".fg-colour");
                fg.forEach((e) => {
                    e.style.color = seq.fg_colour;
                });
                
                seq_idx++;
            }
        }

        if (time_left <= 0) {
            seq_idx = 0;
            sec_idx++;
            
            if (sec_idx >= cd_sections.length) {
                stopCountdown();
                return;
            }

            cd_audio.pause();
            cd_audio.currentTime = 0;
            
            cd_duration = cd_sections[sec_idx].duration;
            cd_target_time = new Date().getTime() + cd_duration;
        }
    }, 9);
}

function stopCountdown() {
    start_button.disabled = false;
    stop_button.disabled = true;

    cd_audio.pause();
    cd_audio.currentTime = 0;
    clearInterval(cd_interval);
}

function playAudio() {
    let audio = new Audio("audio/start.wav");
    audio.play();
}
