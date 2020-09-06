function onClockLoad() {
    let hourHand = document.getElementById("clock-hour-hand");
    let minHand = document.getElementById("clock-min-hand");
    let secHand = document.getElementById("clock-second-hand");
    let clock = {
        hourHand: hourHand,
        minHand: minHand,
        secHand: secHand
    };
    // Runs once first to set up the dials.
    // Then run clockTick every second.
    clockTick(clock);
    setInterval(clockTick, 1000, clock);
}
function clockTick(clock) {
    let now = new Date();
    let hours = now.getHours();
    let mins = now.getMinutes();
    let secs = now.getSeconds();
    clock.hourHand.setAttribute("transform", `rotate(${hours / 12 * 360}, 12, 12)`);
    clock.minHand.setAttribute("transform", `rotate(${mins / 60 * 360}, 12, 12)`);
    clock.secHand.setAttribute("transform", `rotate(${secs / 60 * 360}, 12, 12)`);
}
//# sourceMappingURL=script.js.map