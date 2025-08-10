let deckId
let computerScore = 0
let myScore = 0

const cardsContainer = document.getElementById("cards")
const cardSlots = document.querySelectorAll(".card-slot")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

const baseUrl = "https://deckofcardsapi.com/api/deck"
const deckCount = 1 // 1 is default
const cardCount = 2

newDeckBtn.addEventListener("click", async () => {
    const res = await fetch(`${baseUrl}/new/shuffle/?deck_count=${deckCount}`)
    const data = await res.json()
    const { remaining, deck_id } = data

    remainingText.textContent = `Remaining cards: ${remaining}`
    deckId = deck_id
    console.log(data)
})

drawCardBtn.addEventListener("click", async () => {
    const res = await fetch(`${baseUrl}/${deckId}/draw/?count=${cardCount}`)
    const data = await res.json()
    const { cards, remaining } = data
    console.log(remaining)

    remainingText.textContent = `Remaining cards: ${remaining}`

    if (remaining) {

        cardSlots.forEach((slot, i) => {
            slot.innerHTML = `
                <img src="${cards[i].image}" class="card" />
            `
        })

    //     cardsContainer.children[0].innerHTML = `
    //     <img src="${cards[0].image}" class="card" />
    // `
    //     cardsContainer.children[1].innerHTML = `
    //     <img src="${cards[1].image}" class="card" />
    // `

        const winnerText = determineWinner(cards[0], cards[1])
        header.textContent = winnerText

    } else {
        drawCardBtn.disabled = true
        if (computerScore > myScore) {
            header.textContent = "The computer won the game!"
        } else if (myScore > computerScore) {
            header.textContent = "You won the game!"
        } else {
            header.textContent = "It's a tie game!"
        }
    }
})

function determineWinner(card1, card2) {
    const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1Value = cardValues.indexOf(card1.value)
    const card2Value = cardValues.indexOf(card2.value)

    if (card1Value > card2Value) {
        computerScore++
        computerScoreEl.textContent = `Computer: ${computerScore}`
        return "Computer wins!"
    } else if (card2Value > card1Value) {
        myScore++
        myScoreEl.textContent = `Me: ${myScore}`
        return "You win!"
    } else {
        return "War!"
    }
}