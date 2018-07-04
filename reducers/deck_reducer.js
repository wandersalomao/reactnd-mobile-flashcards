import { ADD_DECK, LOAD_DECKS } from '../actions/action_types'

export default function deck(state = {}, action) {
    switch (action.type) {
        case LOAD_DECKS: {
            return { ...state, ...action.decks }
        }
        case ADD_DECK: {
			return {
				...state, 
				[action.deck.id]: action.deck
			}
		}
        default: {
			return state
		}
    }
}