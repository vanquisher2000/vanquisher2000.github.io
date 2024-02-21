document.addEventListener("DOMContentLoaded",()=>{

    const squares = document.querySelectorAll(".grid div")
    const result = document.querySelector("#result")

    let score = 0
    let currentShooterIndex = 202
    let currentInvaderIndex = 0
    let direction = 1
    let width = 15
    let alienInvaderTakenDown = []
    let invaderID 

    let aliensInvaders = [
         0, 1, 2, 3, 4, 5, 6, 7,8, 9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ]

    aliensInvaders.forEach(alien => squares[currentInvaderIndex + alien].classList.add("invader"))

    squares[currentShooterIndex].classList.add("shooter")

    function MoveShooter(e){
        squares[currentShooterIndex].classList.remove("shooter")
        switch(e.keyCode){
            case 39:
                if(currentShooterIndex % width < width - 1) currentShooterIndex +=1
                break
            case 37:
                if(currentShooterIndex % width != 0) currentShooterIndex -=1
        }
        squares[currentShooterIndex].classList.add("shooter")
    }
    document.addEventListener("keydown",MoveShooter)

    function MoveInvader(){
        const rightEdge = aliensInvaders[aliensInvaders.length - 1] % width === width - 1
        const leftEdge = aliensInvaders[0] % width === 0

        if((leftEdge && direction === -1) || (rightEdge && direction === 1)){
            direction = width
        } else if (direction === width){
            if(leftEdge) direction = 1
            else direction = -1
        }

        for(let i = 0 ; i < aliensInvaders.length; i++){
            squares[aliensInvaders[i]].classList.remove("invader")
        }
        for(let i = 0; i < aliensInvaders.length; i++){
            aliensInvaders[i] += direction
        }
        for(let i = 0; i < aliensInvaders.length;i++){
            if(!alienInvaderTakenDown.includes(i)){
                squares[aliensInvaders[i]].classList.add("invader")
            }
        }

        if(squares[currentShooterIndex].classList.contains("invader","shooter")){
            result.textContent = "game over"
            squares[currentShooterIndex].classList.add("boom")
            clearInterval(invaderID)
        }

        for(var i = 0; i < aliensInvaders.length; i++){
            if(aliensInvaders[i] > (squares.length - width)){
                result.textContent = "game over"
                squares[currentShooterIndex].classList.add("boom")
                clearInterval(invaderID)
            }
        }

        if(alienInvaderTakenDown.length === aliensInvaders.length){
            result.textContent = "you Win"
            clearInterval(invaderID)
        }
    }

    invaderID = setInterval(MoveInvader,500)

    function Shoot(e){
        let laserID
        let currentLaserID = currentShooterIndex

        function MoveLaser(){
            squares[currentLaserID].classList.remove("laser")
            currentLaserID -= width
            squares[currentLaserID].classList.add("laser")
            if(squares[currentLaserID].classList.contains("invader")){
                squares[currentLaserID].classList.remove("laser")
                squares[currentLaserID].classList.remove("invader")
                squares[currentLaserID].classList.add("boom")
                setTimeout(()=> squares[currentLaserID].classList.remove("boom"),50)
                clearInterval(laserID)

                const alienTakenDown = aliensInvaders.indexOf(currentLaserID)
                alienInvaderTakenDown.push(alienTakenDown)
                score++
                result.textContent = score
            }

            if(currentLaserID < width){
                setTimeout(()=> squares[currentLaserID].classList.remove("laser"),100)
                clearInterval(laserID)
            }
        }

        switch(e.keyCode){
            case 38:
                laserID = setInterval(MoveLaser,100)
                break
        }
        
    }

    document.addEventListener("keydown", Shoot)
})