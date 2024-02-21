document.addEventListener("DOMContentLoaded",()=>{

    const squares = document.querySelectorAll(".grid div")
    const scoreDisplay = document.querySelector(".score")
    const startButton = document.querySelector(".start")

    const width = 10
    let currentIndex = 0
    let currentSnake = [2,1,0]
    let appleIndex = 0
    let speed = 0.9
    let direction = 1
    let intervalTime = 1000
    let interval = 0
    let score = 0

    function StartGame(){
        currentSnake.forEach(index => squares[index].classList.remove("snake"))
        squares[appleIndex].classList.remove("apple")

        direction = 1
        currentSnake = [2,1,0]
        currentIndex = 0
        RandomApple()
        
        currentSnake.forEach(index => squares[index].classList.add("snake"))

        score = 0
        scoreDisplay.textContent = score

        intervalTime = 1000
        interval = setInterval(MoveOutComes,intervalTime)
    }

    function MoveOutComes(){
        if(
            (currentSnake[0] + width >= width * width && direction === width) ||//bottom wall
            (currentSnake[0] % width === width -1 && direction === 1) || //right wall
            (currentSnake[0] % width === 0 && direction === -1) || //left wall
            (currentSnake[0] - width < width && direction === -width) ||//up wall
            (squares[currentSnake[0] + direction].classList.contains("snake"))
        ){
            alert("game over")
            return clearInterval(interval)
        }

        const tail = currentSnake.pop()
        squares[tail].classList.remove("snake")
        currentSnake.unshift(currentSnake[0] + direction)

        if(squares[currentSnake[0]].classList.contains("apple")){
            squares[currentSnake[0]].classList.remove("apple")
            squares[tail].classList.add("snake")
            currentSnake.push(tail)
            score++
            scoreDisplay.textContent = score
            RandomApple()
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
        if(e.keyCode === 39){
            direction = 1
        }else if (e.keyCode === 38){
            direction = -width
        }else if (e.keyCode === 37){
            direction = -1
        }else if(e.keyCode === 40){
            direction = width
        }
    }
    
    document.addEventListener("keyup", Control)
    startButton.addEventListener("click",StartGame)
})