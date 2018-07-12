import { ADD_CARD } from './action_types'
import { addNewCard } from '../utils/api'

/**
 * Action used to save a new card
 * @param {*} card - card object 
 * @param {*} navigation - the navigation object that will be used to redirect the user to the next page
 */
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