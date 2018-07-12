import { ADD_QUIZ_ANSWER, CLEAR_QUIZ } from './action_types'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

/**
 * Action used to save an answer for a quiz question
 * @param {*} answer - the answer object that contains the card id and the card answer. 
 * @param {*} navigation - the navigation object that will be used to redirect the user to the next page
 */
export function handleSaveQuizAnswer(answer, navigation) {
    return (dispatch, getState) => {
        const { deckId, currentCardIndex } = navigation.state.params
        const { decks } = getState()
        const deck = decks[deckId]
        const formattedAnswer = { deckId, cardId: answer.cardId, isCorrect: answer.isCorrect }

        dispatch(success(formattedAnswer))

        // if the current card is the last one, we clear the notifications and redirect to the Quiz Results screen
        if (currentCardIndex + 1 === deck.cards.length) {
            clearLocalNotification().then(setLocalNotification)
            navigation.navigate('QuizResults', { deckId })
        } else {
            navigation.push('Quiz', { deckId, currentCardIndex: currentCardIndex + 1 })
        }
    }

    function success(answer) { return { type: ADD_QUIZ_ANSWER, answer } }
}

/**
 * Action used to start a new Quiz. It can be used when starting the quiz for the first time or when retaking the quiz. 
 * @param {*} navigation - the navigation object that will be used to redirect the user to the next page
 */
export function handleStartQuiz(navigation) {
    return (dispatch) => {
        const { deckId } = navigation.state.params
        dispatch(clearQuiz(deckId))
        navigation.navigate('Quiz', { deckId, currentCardIndex: 0 })
    }

    function clearQuiz(deckId) { return { type: CLEAR_QUIZ, deckId } }
}