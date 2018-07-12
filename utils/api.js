import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'MobileFlashcards:Deck'
const CARD_STORAGE_KEY = 'MobileFlashcards:Card'

function _generateUID () {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * API method used to add a new Deck
 * @param {*} title - the deck title 
 */
export const addNewDeck = (title) => {
    try {
        const id = _generateUID()
        const deck = { id, title, cards: [] }

        return _saveDeck(deck)
    } catch(error) {
        return Promise.reject('Error saving Deck: ' + error)
    }
}

/**
 * API method used to add a new Card to a deck
 * @param {*} card - the card object containing card and deck info
 */
export const addNewCard = async (card) => {
    try {
        const id = _generateUID()
        const formattedCard = { id, ...card }

        return _saveCard(formattedCard)
    } catch(error) {
        return Promise.reject('Error saving Card: ' + error)
    }
}

/**
 * API method used to load the initial data. It returns a promise containing decks and cards
 */
export const getInitialData = () => {
    return Promise.all([
        _getDecks(),
        _getCards(),
    ]).then(([decks, cards]) => ({
        decks,
        cards
    }))
}

/**
 * Internal method used to save a deck into the storage
 * @param {*} deck 
 */
const _saveDeck = async (deck) => {
    await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [deck.id]: deck
    }))
    return Promise.resolve(deck)
}

/**
 * Internal method used to save a card into the storage 
 * @param {*} card 
 */
const _saveCard = async (card) => {
    await AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify({
        [card.id]: card
    }))

    await _getDecks().then(
        decks => {
            const deck = decks[card.deck]
            deck.cards = deck.cards.concat([card.id])
            _saveDeck(deck)
        }
    )

    return Promise.resolve(card)
}

/**
 * Internal method used to get the decks from the storage
 */
const _getDecks = () => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then( results => JSON.parse(results) )
}

/**
 * Internal method used to get the cards from the storage
 */
const _getCards = () => {
    return AsyncStorage.getItem(CARD_STORAGE_KEY).then( results => JSON.parse(results) )
}