let secondsPassed = document.querySelector(".seconds_passed")

let hours = document.querySelector(".hours")
let minutes = document.querySelector(".minutes")
let seconds = document.querySelector(".seconds")
let daytime = document.querySelector(".daytime")
let copyButton = document.querySelector(".copy_btn")

let placeholder = document.querySelector(".timestamp input").placeholder
let convertInput = document.querySelector(".timestamp input")
let convertBtn = document.querySelector(".convert")
let table = document.querySelector("table")
let format = document.querySelector("table .format td")
let GMT = document.querySelector("table .GMT td")
let timeZone = document.querySelector("table .time_zone td")
let relative = document.querySelector("table .relative td")

function clock(){
    let now = new Date()
    
    secondsPassed.innerText = Math.trunc(now.getTime() / 1000)

    minutes.innerText = addZero(now.getMinutes())
    seconds.innerText = addZero(now.getSeconds())
    if(now.getHours() >= 12){
        hours.innerText = now.getHours() - 12
        daytime.innerText = "PM"
    }
    else{
        hours.innerText = now.getHours()
        daytime.innerText = "AM"
    }
}

function addZero(number){
    if(number >= 0 && number < 10){
        return `0${number}`
    }
    else{
        return number
    }
}

copyButton.addEventListener("click", (event) => {
    if(navigator.clipboard){
        copyButton.innerText = "Copied!"
        setTimeout(() => {
            copyButton.innerText = "Copy"
        }, 1000);
        navigator.clipboard.writeText(secondsPassed.innerText)
    }
})

convertBtn.addEventListener("click", () => {
    if(convertInput.value != 0){
        table.style.display = "block"
        
        let value = 0
        if(convertInput.value.length < 12){
            format.innerText = "Seconds"
            value = convertInput.value * 1000
        }
        else if(convertInput.value.length < 15){
            format.innerText = "Milliseconds (1/1,000 second)"
            value = convertInput.value
        }
        else if(convertInput.value.length < 17){
            format.innerText = "Microseconds (1/1,000,000 second)"
            value = convertInput.value / 1000
        }
        else{
            format.innerText = "Nanoseconds (1 billionth of a second)"
            value = convertInput.value / 1000000
        }
        let then = new Date(+value)
        let now = new Date()
        let time = addZero(then.getUTCHours()) + ":" + addZero(then.getUTCMinutes()) + ":" + addZero(then.getUTCSeconds()) + " GMT+0000"
        
        GMT.innerText = then.toDateString() + " " + time
        timeZone.innerText = then

        if(then.getFullYear() > now.getFullYear()){
            if(then.getFullYear() - now.getFullYear() == 1){
                relative.innerText = "in a year"
            }
            else{
                relative.innerText = "in " + (then.getFullYear() - now.getFullYear()) + " years"
            }
        }
        else if(then.getFullYear() < now.getFullYear()){
            if(now.getFullYear() - then.getFullYear() == 1){
                relative.innerText = "a year ago"
            }
            else{
                relative.innerText = now.getFullYear() - then.getFullYear() + " years ago"
            }
        }
        else{
            if(then.getMonth() > now.getMonth()){
                if(then.getMonth() - now.getMonth() == 1){
                    relative.innerText = "in a month"
                }
                else{
                    relative.innerText = "in " + (then.getMonth() - now.getMonth()) + " months"
                }
            }
            else if(then.getMonth() < now.getMonth()){
                if(now.getMonth() - then.getMonth() == 1){
                    relative.innerText = "a month ago"
                }
                else{
                    relative.innerText = now.getMonth() - then.getMonth() + " months ago"
                }
            }
            else{
                if(then.getDay() > now.getDay()){
                    if(then.getDay() - now.getDay() == 1){
                        relative.innerText = "in a day"
                    }
                    else{
                        relative.innerText = "in " + (then.getDay() - now.getDay()) + " days"
                    }
                }
                else if(then.getDay() < now.getDay()){
                    if(now.getDay() - then.getDay() == 1){
                        relative.innerText = "a day ago"
                    }
                    else{
                        relative.innerText = now.getDay() - then.getDay() + " days ago"
                    }
                }
                else{
                    if(then.getHours() > now.getHours()){
                        if(then.getHours() - now.getHours() == 1){
                            relative.innerText = "in a hour"
                        }
                        else{
                            relative.innerText = "in " + (then.getHours() - now.getHours()) + " hours"
                        }
                    }
                    else if(then.getHours() < now.getHours()){
                        if(now.getHours() - then.getHours() == 1){
                            relative.innerText = "a hour ago"
                        }
                        else{
                            relative.innerText = now.getHours() - then.getHours() + " hours ago"
                        }
                    }
                    else{
                        if(then.getMinutes() > now.getMinutes()){
                            if(then.getMinutes() - now.getMinutes() == 1){
                                relative.innerText = "in a minute"
                            }
                            else{
                                relative.innerText = "in " + (then.getMinutes() - now.getMinutes()) + " minutes"
                            }
                        }
                        else if(then.getMinutes() < now.getMinutes()){
                            if(now.getMinutes() - then.getMinutes() == 1){
                                relative.innerText = "a minute ago"
                            }
                            else{
                                relative.innerText = now.getMinutes() - then.getMinutes() + " minutes ago"
                            }
                        }
                        else{
                            if(then.getSeconds() > now.getSeconds()){
                                relative.innerText = "in a few seconds"
                            }
                            else{
                                relative.innerText = "a few seconds ago"
                            }
                        }
                    }
                }
            }
        }
    }
})

convertInput.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        convertBtn.click();
    }
})

clock()
setInterval(clock, 1000)