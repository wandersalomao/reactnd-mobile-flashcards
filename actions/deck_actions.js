import { ADD_DECK } from './action_types'
import { addNewDeck } from '../utils/api'

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