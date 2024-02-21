const square = document.querySelectorAll(".square")
const mole = document.querySelectorAll(".mole")
const timeLeft = document.querySelector("#timeLeft")

let score = document.querySelector("#score")
let currentTime = timeLeft.textContent
let result = 0

function RandomSquare(){
    square.forEach(cell => {
        cell.classList.remove("mole")
    })

    let randomPosition = square[Math.floor(Math.random()*9)]
    randomPosition.classList.add("mole")
    hitPosition = randomPosition.id
}

square.forEach(cell=>{
    cell.addEventListener("mouseup",()=>{
        if(cell.id === hitPosition){
            result++
            score.textContent = result
        }
    })
})

function MoveMole(){
    let timerID = null
    timerID = setInterval(RandomSquare,1000)
}

MoveMole()

function CountDown(){
    currentTime--
    timeLeft.textContent = currentTime
    if(currentTime === 0){
        alert("game over ! your score is " + result)
        clearInterval(timerID)
        setTimeout(location.reload(),500)
    }
}

let timeID = setInterval(CountDown,1000)
