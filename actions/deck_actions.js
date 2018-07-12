import { ADD_DECK } from './action_types'
import { addNewDeck } from '../utils/api'

/**
 * Action used to save a new deck
 * @param {*} title - the Deck title
 * @param {*} navigation - the navigation object that will be used to redirect the user to the next page
 */
export function handleSaveDeck(title, navigation) {
    return (dispatch) => {
        addNewDeck(title)
            .then(
                deck => {
                    dispatch(success(deck))
                    navigation.replace('DeckDetails', { deckId: deck.id })
                }
            )
    }

    function success(deck) { return { type: ADD_DECK, deck } }
}