let myBtn = document.querySelector('#myBtn');
let circle = document.querySelector('#circle');
let totalSpan = document.querySelector('#totalSpan');
let dateSpan = document.querySelector('#dateSpan');
let lastCigSpan = document.querySelector('#lastCigSpan');
let todayCigs;
let totalCigs;
let startingDate;
let refresh = true;

setVariables();
update();


circle.addEventListener('click', updateTodayAndTotal);
myBtn.addEventListener('click', resetToday);

function update() {
    // update circle
    circle.innerHTML = todayCigs;

    // update total
    totalSpan.innerHTML = totalCigs;

    // update time
    updateTime();

}

function updateTodayAndTotal() {
    todayCigs++;
    totalCigs++;
    refresh = false;
    localStorage.totalCigs = totalCigs;
    localStorage.todayCigs = todayCigs;
    circle.style.backgroundImage = "url('images/smoke2.png')";
    circle.style.backgroundSize = "100%";
    setTimeout(() => {
        circle.style.backgroundImage = "none";
        circle.style.backgroundSize = "0%";
    }, 2000)

    update();
}

function updateTime() {
    let lastTime;
    if (totalCigs == 1) {
        let now = new Date();
        localStorage.startingDate = now.toDateString();
        startingDate = now.toDateString();
        dateSpan.innerHTML = startingDate;
        lastCigSpan.innerHTML = "First Cig";

        lastTime = now.getTime();
        localStorage.lastTime = lastTime;

    } else {
        dateSpan.innerHTML = startingDate;
        if (localStorage.lastTime) {
            let newTime = new Date().getTime();
            var diff = Math.floor((newTime - localStorage.lastTime) / 1000);
            lastCigSpan.innerHTML = calcTime(diff); // 
            if (!refresh) {
                localStorage.lastTime = newTime;

            };

        };
    }
}

function calcTime(time) {
    if (time < 60) {
        return time + " sec";
    } else if (time > 59 && time < 3600) {
        return Math.floor(time / 60) + ' min';
    } else if (time > 3600) {
        return "More then " + Math.floor(time / 3600) + " hours";
    }
}


function resetToday() {
    todayCigs = 0;
    localStorage.todayCigs = todayCigs;
    update();
}



function setVariables() {
    // set today cigs
    if (localStorage.todayCigs) {
        todayCigs = localStorage.todayCigs;
    } else {
        todayCigs = 0;
    }

    // set total cigs
    if (localStorage.totalCigs) {
        totalCigs = localStorage.totalCigs;
    } else {
        totalCigs = 0;
    }

    // set startingDate
    if (localStorage.startingDate) {
        startingDate = localStorage.startingDate;
    } else {
        startingDate = '';
    }
}