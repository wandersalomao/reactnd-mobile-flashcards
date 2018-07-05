import { ADD_CARD, LOAD_CARDS } from '../actions/action_types'

export default function deck(state = {}, action) {
    switch (action.type) {
        case LOAD_CARDS: {
            return { ...state, ...action.cards }
        }
        case ADD_CARD: {
			return {
				...state, 
				[action.card.id]: action.card
			}
		}
        default: {
			return state
		}
    }
}