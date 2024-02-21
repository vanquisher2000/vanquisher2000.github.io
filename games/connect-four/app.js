document.addEventListener("DOMContentLoaded",()=>{
    const squares = document.querySelectorAll(".grid div")
    const result = document.querySelector("#result")
    const displayCurrentPlayer = document.querySelector("#current-player")

    let currentPlayer = 1

    for(var i = 0;i<squares.length;i++){
        (function(index){
            squares[i].onclick = function(){
                if(squares[index + 7].classList.contains("taken")){
                    squares[index].classList.add("taken")
                    if(currentPlayer === 1){
                        squares[index].classList.add("player-one")
                        currentPlayer = 2
                    }else if(currentPlayer = 2){
                        squares[index].classList.add("player-two")
                        currentPlayer = 1
                    }
                    displayCurrentPlayer.innerHTML = currentPlayer
                }else{
                    alert("can not choose this square")
                }
            }
        })(i)
    }
})