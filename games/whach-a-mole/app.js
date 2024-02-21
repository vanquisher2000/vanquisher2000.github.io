const square = document.querySelectorAll(".square")
const mole = document.querySelectorAll(".mole")
const timeLeft = document.querySelector("#timeLeft")
let score = document.querySelector("#score")

let result = 0
let currentTime = timeLeft.textContent

function RandomSquare (){
    square.forEach(className =>{
        className.classList.remove("mole")
    })

    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add("mole")

    hitPosition = randomPosition.id
}

square.forEach(cell => {
    cell.addEventListener("mouseup",()=>{
        if(cell.id === hitPosition){
            result = result + 1
            score.textContent = result
        }
    })
})

function MoveMole (){
    let timeID = null
    timeID = setInterval(RandomSquare,1000)
}

MoveMole()

function CountDown (){
    currentTime--
    timeLeft.textContent = currentTime
    if(currentTime ===0){
        clearInterval(timeID)
        alert("game over!  your score is " + result)
    }
}

let timeID = setInterval(CountDown,1000)