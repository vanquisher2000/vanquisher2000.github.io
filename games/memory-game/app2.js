document.addEventListener("DOMContentLoaded",()=>{

    cardsArray = [
        {
            name : "cheeseburger",
            img : "images/cheeseburger.png"
        },
        {
            name : "fries",
            img : "images/fries.png"
        },
        {
            name : "hotdog",
            img : "images/hotdog.png"
        },
        {
            name : "ice-cream",
            img : "images/ice-cream.png"
        },
        {
            name : "milkshake",
            img : "images/milkshake.png"
        },
        {
            name : "pizza",
            img : "images/pizza.png"
        },
        {
            name : "cheeseburger",
            img : "images/cheeseburger.png"
        },
        {
            name : "fries",
            img : "images/fries.png"
        },
        {
            name : "hotdog",
            img : "images/hotdog.png"
        },
        {
            name : "ice-cream",
            img : "images/ice-cream.png"
        },
        {
            name : "milkshake",
            img : "images/milkshake.png"
        },
        {
            name : "pizza",
            img : "images/pizza.png"
        }
    ]

    cardsArray.sort(()=> 0.5 - Math.random())

    const grid = document.querySelector(".grid")
    const result = document.querySelector("#result")
    var cardsChosen = []
    var cardsChosenID = []
    var cardsWon = []

    function CreateBoard(){
        for(let i =0;i < cardsArray.length;i++){
            let card = document.createElement("img")
            card.setAttribute("src" , "images/blank.png")
            card.setAttribute("data-id",i)
            card.addEventListener("click",Flip)
            grid.appendChild(card)
        }
    }

    CreateBoard()

    function Flip(){
        if(this.getAttribute("src") !== "images/white.png"){

            const cardID = this.getAttribute("data-id")
            this.setAttribute("src",cardsArray[cardID].img)
            cardsChosen.push(this)
            setTimeout(CheckMatch,500)
        }
        
    }

    function CheckMatch(){

        if(cardsChosen.length === 2){
            if(cardsChosen[0].getAttribute("src") === cardsChosen[1].getAttribute("src")){
                alert("you have found a match")
                cardsChosen[0].setAttribute("src","images/white.png")
                cardsChosen[1].setAttribute("src","images/white.png")
                cardsWon.push(cardsChosen[0])
                result.textContent = cardsWon.length
                if(cardsWon.length === cardsArray.length/2){
                    alert("congratulations you have foung them all")
                    setTimeout(location.reload(),500)
                }
            } 
            else{
                alert("try again")
                cardsChosen[0].setAttribute("src","images/blank.png")
                cardsChosen[1].setAttribute("src","images/blank.png")
            }
            cardsChosen = []
        }
    }

})