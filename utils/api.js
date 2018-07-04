import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'MobileFlashcards:Deck'

function _generateUID () {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const saveDeck = async (title) => {
    try {
        const id = _generateUID()
        const deck = { id, title, cards: [] }

        await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
            [id]: deck
        }))

        return Promise.resolve(deck)
    } catch(error) {
        return Promise.reject('Error saving the Deck: ' + error)
    }
}

export const getInitialData = () => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then( results => JSON.parse(results) )
}