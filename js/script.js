let hours = document.querySelector(".hours");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");

let setTime = document.querySelector("input")
let button = document.querySelector("button")

let yourTimeDiv = document.querySelector(".setted_time")
let yourTime = document.querySelector(".your_time")

function clock(){
    let time = new Date;

    button.addEventListener("click", () => {
        yourTimeDiv.style.display = "block"
        yourTime.innerText = addZero(newClock(setTime.value, time.getHours())) + ":" + addZero(time.getMinutes()) + ":" + addZero(time.getSeconds())
    })

    hours.innerText = addZero(time.getHours())
    minutes.innerText = addZero(time.getMinutes())
    seconds.innerText = addZero(time.getSeconds())
}

function addZero(number){
    if(number >= 0 && number < 10){
        return `0${number}`
    }
    else{
        return number
    }
}

clock()
setInterval(clock, 1000);

function newClock(newTime, time){
    newTime = newTime % 24
    newTime = time + +setTime.value
    newTime = newTime % 24

    if(newTime < 0){
        newTime += 24
    }

    return newTime
}