document.addEventListener("DOMContentLoaded",()=>{

    const squares = document.querySelectorAll(".grid div")
    const startButton = document.querySelector(".start")
    const scoreDisplay = document.querySelector(".score")
    
    const width = 10
    let currentIndex = 0
    let appleIndex = 0
    let currentSnake = [2,1,0]
    let direction = 1
    let speed = 0.9
    let score = 0
    let intervalTime = 1000
    let interval = 0

    function StartGame(){
        currentSnake.forEach(index => squares[index].classList.remove("snake"))
        squares[appleIndex].classList.remove("apple")
        
        clearInterval(interval)
        RandomApple()
        score = 0
        direction = 1
        scoreDisplay.innerText = score
        intervlTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add("snake"))
        interval = setInterval(MoveOutComes,intervalTime)
    }

    function MoveOutComes(){
        if(
            (currentSnake[0] + width >= width * width && direction === width) ||
            (currentSnake[0] % width === width - 1 && direction === 1) ||
            (currentIndex[0] % width === 0 && direction === -1) ||
            (currentSnake[0] - width < width && direction === -width) ||
            (squares[currentSnake[0] + direction].classList.contains("snake"))
        ){
            
            return clearInterval(interval)
        }

        const tail = currentSnake.pop()
        squares[tail].classList.remove("snake")
        currentSnake.unshift(currentSnake[0] + direction)

        if(squares[currentSnake[0]].classList.contains("apple")){
            squares[currentSnake[0]].classList.remove("apple")
            squares[tail].classList.add("snake")
            currentSnake.push(tail)
            RandomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(MoveOutComes,intervalTime)
        }
        squares[currentSnake[0]].classList.add("snake")
    }

    function RandomApple(){
        do{
            appleIndex = Math.floor(Math.random()*squares.length)
        }while(squares[appleIndex].classList.contains("snake"))

        squares[appleIndex].classList.add("apple")
    }

    function Control(e){
        squares[currentIndex].classList.remove("snake")

        if(e.keyCode === 39 ){
            direction = 1
        }else if ( e.keyCode === 38){
            direction = -width
        }else if (e.keyCode === 37){
            direction = -1
        }else if (e.keyCode === 40){
            direction = +width
        }
    }

    document.addEventListener("keyup",Control)
    startButton.addEventListener("click",StartGame)
})