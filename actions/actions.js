import { ADD_DECK, LOAD_DECKS } from './action_types'
import { saveDeck, getInitialData } from '../utils/api'

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
            .then(
                decks => { 
                    dispatch(loadDecks(decks))
                }
            )
    }

    function loadDecks(decks) { return { type: LOAD_DECKS, decks } }
}

export function handleSaveDeck(title, navigation) {
    return (dispatch) => {
        saveDeck(title)
            .then(
                deck => {
                    dispatch(success(deck))
                    navigation.goBack()
                }
            )
    }

    function success(deck) { return { type: ADD_DECK, deck } }
}