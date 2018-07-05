import { ADD_DECK, ADD_CARD, LOAD_DECKS, LOAD_CARDS } from './action_types'
import { addNewDeck, addNewCard, getInitialData } from '../utils/api'

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
            .then(({ decks, cards }) => {
                dispatch(loadDecks(decks))
                dispatch(loadCards(cards))
            })
    }

    function loadDecks(decks) { return { type: LOAD_DECKS, decks } }
    function loadCards(cards) { return { type: LOAD_CARDS, cards } }
}

export function handleSaveDeck(title, navigation) {
    return (dispatch) => {
        addNewDeck(title)
            .then(
                deck => {
                    dispatch(success(deck))
                    navigation.goBack()
                }
            )
    }

    function success(deck) { return { type: ADD_DECK, deck } }
}

export function handleSaveCard(card, navigation) {
    return (dispatch) => {
        addNewCard(card)
            .then(
                card => {
                    dispatch(success(card))
                    navigation.goBack()
                }
            )
    }

    function success(card) { return { type: ADD_CARD, card } }
}