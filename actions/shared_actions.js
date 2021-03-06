import { LOAD_DECKS, LOAD_CARDS } from './action_types'
import { getInitialData } from '../utils/api'

/**
 * Action used to load the initial data into the redux store
 */
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