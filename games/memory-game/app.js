document.addEventListener("DOMContentLoaded",()=>{

    const cardArray = [
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

    cardArray.sort(()=> 0.5 - Math.random())

    const grid = document.querySelector(".grid")
    const result = document.querySelector("#result")
    var chosenCards = []
    var chosenCardsID = []
    var cardsWon = []

    function CreateBoard (){
        for(let i = 0; i < cardArray.length; i++){
            var card = document.createElement("img")
            card.setAttribute("src","images/blank.png")
            card.setAttribute("data-id", i)
            card.addEventListener("click" , FilpCard)
            grid.appendChild(card)
        }
    }

    CreateBoard()

    function FilpCard(){
        var cardID = this.getAttribute("data-id")
        chosenCards.push(cardArray[cardID].name)
        chosenCardsID.push(cardID)
        this.setAttribute("src",cardArray[cardID].img)
        if(chosenCards.length === 2){
            setTimeout(CheckForMatch, 500)
        }
    }

    function CheckForMatch(){
        var cards = document.querySelectorAll("img")
        var optionOneID = chosenCardsID[0]
        var optionTwoID = chosenCardsID[1]
        if(chosenCards[0] === chosenCards[1]){
            alert("found a match")
            cards[optionOneID].setAttribute("src","images/white.png")
            cards[optionTwoID].setAttribute("src","images/white.png")
            cardsWon.push(chosenCards)
        }
        else{
            alert("sorry try again")
            cards[optionOneID].setAttribute("src","images/blank.png")
            cards[optionTwoID].setAttribute("src","images/blank.png")

        }
        chosenCardsID = []
        chosenCards = []
        result.textContent = cardsWon.length
        if(cardsWon.length === cardArray.length/2){
            alert(" congratulations you have won")
        }
    }


})