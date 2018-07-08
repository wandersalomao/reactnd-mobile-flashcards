import { ADD_QUIZ_ANSWER } from './action_types'

export function handleSaveQuizAnswer(answer, navigation) {
    return (dispatch, getState) => {
        const { deckId, currentCardIndex } = navigation.state.params
        const { decks } = getState()
        const deck = decks[deckId]
        const formattedAnswer = { deckId, cardId: answer.cardId, isCorrect: answer.isCorrect }

        dispatch(success(formattedAnswer))

        if (currentCardIndex + 1 === deck.cards.length) {
            navigation.navigate('Home')    
        } else {
            navigation.push('Quiz', { deckId, currentCardIndex: currentCardIndex + 1 })
        }
    }

    function success(answer) { return { type: ADD_QUIZ_ANSWER, answer } }
}