document.addEventListener("DOMContentLoaded",()=>{
    const squares = document.querySelectorAll(".grid div")
    const result = document.querySelector("#result")

    let score = 0
    let direction = 1
    let width = 15
    let shooterIndex = 202
    let invaderID
    let invadersTakenDown = []

    let alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7,8, 9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ]

    alienInvaders.forEach(index => squares[index].classList.add("invader"))
    squares[shooterIndex].classList.add("shooter")

    function MoveShooter(e){
        squares[shooterIndex].classList.remove("shooter")
        switch(e.keyCode){
            case 37:
                if(shooterIndex % width > 0) shooterIndex -=1
                break
            case 39:
                if(shooterIndex % width < width -1) shooterIndex +=1
                break
        }
        squares[shooterIndex].classList.add("shooter")
    }

    document.addEventListener("keydown",MoveShooter)

    function MoveInvader(){
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
        if((leftEdge && direction === -1) || (rightEdge && direction ===1)){
            direction = width
        }else if (direction === width){
            if(leftEdge) direction = 1
            else direction = -1
        }
        
        alienInvaders.forEach(index => squares[index].classList.remove("invader"))
        for(var i = 0; i < alienInvaders.length; i++){
           alienInvaders[i] += direction 
        }
        for(var i = 0; i < alienInvaders.length; i++){
            if(!invadersTakenDown.includes(i))squares[alienInvaders[i]].classList.add("invader")
         }

        for(var i = 0; i < alienInvaders.length; i++){
            if(squares[alienInvaders[i]].classList.contains("shooter") || alienInvaders[i] > squares.length - width){
                result.textContent = "game over"
                squares[shooterIndex].classList.add("boom")
                clearInterval(invaderID)
            }
        }
        if(invadersTakenDown.length === alienInvaders.length){
            result.textContent = "you win"
            clearInterval(invaderID)
        }

    }
    invaderID = setInterval(MoveInvader,500)

    function Shoot(e){
        let laserID 
        let laserIndex = shooterIndex
        function MoveLaser(){
            squares[laserIndex].classList.remove("laser")
            laserIndex -= width
            squares[laserIndex].classList.add("laser")
            if(squares[laserIndex].classList.contains("invader")){
                squares[laserIndex].classList.remove("invader","laser")
                squares[laserIndex].classList.add("boom")
                setTimeout(()=> squares[laserIndex].classList.remove("boom"),100)
                clearInterval(laserID)
                const alienTakenDown = alienInvaders.indexOf(laserIndex)
                invadersTakenDown.push(alienTakenDown)
                score++
                result.textContent = score
            }
            if(laserIndex < width ){
                setTimeout(()=> squares[laserIndex].classList.remove("laser"),100)
                clearInterval(laserID)
            }
        }
        switch(e.keyCode){
            case 38:
                laserID = setInterval(MoveLaser,100)
                break
        }
    }
    document.addEventListener("keydown",Shoot)

})