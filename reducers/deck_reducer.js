import { ADD_DECK, ADD_CARD, LOAD_DECKS } from '../actions/action_types'

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
        case ADD_CARD: {
            return {
                ...state, 
                [action.card.deck]: { 
                    ...state[action.card.deck],
                    cards: state[action.card.deck].cards.concat([action.card.id])
                }
            }
        }
        default: {
			return state
		}
    }
}