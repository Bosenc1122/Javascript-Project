document.addEventListener('DOMContentLoaded', () => {
    const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const totalPairs = symbols.length;
    const cards = [...symbols, ...symbols];
    let flippedCards = [];
    let matchedPairs = 0;

    const gameContainer = document.getElementById('game-container');

    // Shuffle the cards
    cards.sort(() => Math.random() - 0.5);

    // Create the cards and add them to the game container
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.dataset.index = index;

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.style.backgroundImage = `url('img-${symbol.toLowerCase()}.png')`;

        card.appendChild(cardFront);

        card.addEventListener('click', () => flipCard(card));

        gameContainer.appendChild(card);
    });

    // Function to flip a card
    function flipCard(card) {
        if (flippedCards.length < 2 && !flippedCards.includes(card)) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    // Function to check if the flipped cards match
    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Match found
            card1.removeEventListener('click', () => flipCard(card1));
            card2.removeEventListener('click', () => flipCard(card2));
            matchedPairs++;

            if (matchedPairs === totalPairs) {
                alert('Congratulations! You won!');
            }
        } else {
            // No match, flip cards back
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards = [];
    }
});