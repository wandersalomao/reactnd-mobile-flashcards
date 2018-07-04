import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import deckReducer from './deck_reducer'

const rootReducer = combineReducers({
    decks: deckReducer,
    form: formReducer
})

export default rootReducer