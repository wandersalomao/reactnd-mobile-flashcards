import { ADD_CARD } from './action_types'
import { addNewCard } from '../utils/api'

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