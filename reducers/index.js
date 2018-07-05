import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import deckReducer from './deck_reducer'
import cardReducer from './card_reducer'

const rootReducer = combineReducers({
    decks: deckReducer,
    cards: cardReducer,
    form: formReducer
})

export default rootReducer