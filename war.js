//Week 9 Assignment

//This class will describe the properties the card by suit and rank.
class Card {
    constructor(suit, rank) { //Constructor method for the suit and rank properties
        this.suit = suit;
        this.rank = rank;
    }

//This sections provides the properties of the ranks of the two cards being played.
    compareRank(otherCard) {
        const ranks = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
        };
        return ranks[this.rank] - ranks[otherCard.rank];
    }

//This section will return a string representation of the card.
    toString() {
        return `${this.rank} of ${this.suit}`;
    }
}

//This class will describe or represent the deck of cards. It will populate cards with each suit and number combination for a total of 52 cards in the deck.
class Deck {
    constructor() {
        this.cards = []; 
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        for (const suit of suits) {
            for (const rank of ranks) {
                this.cards.push(new Card(suit, rank));
            }
        }
        this.shuffle();
    }

//This method will "shuffle" the cards.
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

//This method will deal a card per player for the hand by popping it off the array.
    dealCard() {
        return this.cards.pop();
    }
}


//This class describes the players. There will be two players. Each player has a name, a hand, and a score.
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.score = 0;
    }

//Each player will play a card from their hand.
    playCard() {
        return this.hand.pop();
    }


//After a card is played, the player has another available card to play in the next hand.    
    receiveCards(cards) {
        this.hand = [...this.hand, ...cards];
    }
}

//This section is the actual playing of the game.
class Game {
    constructor() {
        this.players = [new Player("James"), new Player("CJ")];
        this.deck = new Deck();
    }

//This method starts off the game by dealing the players cards. 
    start() {
        while (this.deck.cards.length > 0) {
            for (const player of this.players) {
                const card = this.deck.dealCard();
                if (card) {
                    player.receiveCards([card]);
                } else {
                    break;
                }
            }
        }

//This section will show the players cards, compare them, and determine who wins the hand.
        while (this.players.every(player => player.hand.length > 0)) {
            const cardsInPlay = this.players.map(player => player.playCard()); //Single line arrow function.
            console.log(`${this.players[0].name} plays ${cardsInPlay[0].toString()}`); //Shows the cards played.
            console.log(`${this.players[1].name} plays ${cardsInPlay[1].toString()}`);
            
            const comparison = cardsInPlay[0].compareRank(cardsInPlay[1]); //Compares the cards dealt to see who wins the hand.
            if (comparison > 0) {
                console.log(`${this.players[0].name} wins the hand!`);
                this.players[0].score++;
            } else if (comparison < 0) {
                console.log(`${this.players[1].name} wins the hand!`);
                this.players[1].score++;
            } else {
                console.log("It's a tie!");
            }
        }

//This section determines the winner of the game using if/else statements. 
        if (this.players[0].score > this.players[1].score) {
            console.log(`${this.players[0].name} wins the game with ${this.players[0].score} points!`);
        } else if (this.players[0].score < this.players[1].score) {
            console.log(`${this.players[1].name} wins the game with ${this.players[1].score} points!`);
        } else {
            console.log("Oh no! It's a tied game! Best 2 out of 3?");
        }
    }
}

// This section instantiates and begins the game.
let warGame = new Game();
warGame.start(); //Start method is called to begin the game.
