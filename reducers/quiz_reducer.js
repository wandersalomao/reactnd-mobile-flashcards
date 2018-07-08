import { ADD_QUIZ_ANSWER } from '../actions/action_types'

export default function quiz(state = {}, action) {
    switch (action.type) {
        case ADD_QUIZ_ANSWER: {
            const deckId = action.answer.deckId
            const quizAnswers = state[deckId] ? state[deckId] : []
            return {
                ...state,
                [deckId]: quizAnswers.concat([{ card: action.answer.cardId, isCorrect: action.answer.isCorrect }])
            }
        }
        default: {
			return state
		}
    }
}