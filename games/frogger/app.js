document.addEventListener("DOMContentLoaded",()=>{
    const grid = document.querySelector(".grid")
    const result = document.querySelector(".result")
    const timeLeft = document.querySelector(".time-left")
    const startButton = document.querySelector(".start")

    for(let i = 0;i<900;i++){
        let cell = document.createElement("div")
        cell.classList.add(i)
        grid.appendChild(cell)
    }

    const squares = document.querySelectorAll(".grid div")

    const winningSquare = 14

    let frogIndex = 824
    let currentTime = 60
    let timerID 
    let timer = 1000
    let width = 30
    let moveCarsID
    
    let river = []
    let street = []
    let dead = false
    let moveLogsID
    

    for(let i = 480;i < 630; i++ ){
        street.push(i)
    }

    for(let i = 90; i<330;i++){
        river.push(i)
    }

    function StartGame(){
        squares[frogIndex].classList.remove("frog")
        frogIndex = 824
        squares[frogIndex].classList.add("frog")
        squares[winningSquare].classList.add("winning-square")
        street.forEach(element => {
            squares[element].classList.add("street")
        });
        river.forEach(element => {squares[element].classList.add("river")});
        currentTime = 60
        timerID = setInterval(CountDown,timer)
        moveCarsID = setInterval(()=>{MakeCars(509,630,500,[1,0],"car")},2000)
        moveLogsID = setInterval(()=>{MakeCars(119,330,500,[3,2,1,0],"log")},1000)
        
    }

    startButton.addEventListener("click",StartGame)

    function CountDown(){
        currentTime--
        timeLeft.textContent = currentTime
        if(currentTime === 0){
            result.textContent = "game over"
            clearInterval(timerID)
            clearInterval(moveCarsID)
            clearInterval(moveLogsID)

        }
    }

    function MoveFrog(e){
        if(!dead){
            squares[frogIndex].classList.remove("frog")
            const leftEdge = frogIndex % width === 0
            const rightEdge = frogIndex % width === width - 1
            const bottomEdge = frogIndex > width * width - width
            const topEdge = frogIndex < width
            
            switch(e.keyCode){
                case 37:
                    if(!leftEdge) frogIndex -=1
                    break
                case 38:
                    if(!topEdge) frogIndex -= width
                    break
                case 39:
                    if(!rightEdge) frogIndex +=1
                    break
                case 40:
                    if(!bottomEdge) frogIndex += width
                    break
            }
                            
            squares[frogIndex].classList.add("frog")
            if(squares[frogIndex].classList.contains("winning-square")){
                result.textContent = "you win"
            }
            if((squares[frogIndex].classList.contains("car")) ||
            (squares[frogIndex].classList.contains("river") && !squares[frogIndex].classList.contains("log"))
            ){
                dead = true
                result.textContent = "game over"
                clearInterval(moveCarsID)
                clearInterval(timerID)
                clearInterval(moveLogsID)
                squares[frogIndex].classList.add("dead")
            }
        }
    }
    document.addEventListener("keydown",MoveFrog)

    function MakeCars(min,max,time,object,objectName){
        let startSquare = []
        let car = object
        for(var i = min;i< max; i +=30){
            startSquare.push(i)
        }
        randomIndex = Math.floor(Math.random() * startSquare.length)
        
        

        for (let i = 0; i < car.length; i++) {
            squares[startSquare[randomIndex] - i].classList.add(objectName)
            car[i] = startSquare[randomIndex] - car[i]
        }
        let carID
        function MoveCars(){
            car.forEach(element => squares[element].classList.remove(objectName))
            const tail = car.pop()
            squares[tail].classList.remove(objectName)
            car.unshift(car[0]-1)
            car.forEach(element => {squares[element].classList.add(objectName)});
            if(objectName === "log"){
                car.forEach(element => {
                    if(squares[element].classList.contains("frog")){
                        squares[element].classList.remove("frog")
                        frogIndex -=1
                        squares[frogIndex].classList.add("frog")
                    }
                });
            }
            for(var i = 0;i< car.length;i++){
                if(car[i] % width === 0){
                    console.log(car[i])
                    squares[car[i]].classList.remove(objectName)
                    car.shift()
                    setTimeout(()=>{
                    },100)
                    if(i === car.length - 1)clearInterval(carID)
                }
            }
        }
        carID = setInterval(MoveCars,time)
    }

})