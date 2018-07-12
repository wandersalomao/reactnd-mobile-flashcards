import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { white, green, purple } from '../utils/colors'
import { connect } from 'react-redux'
import { handleStartQuiz } from '../actions/quiz_actions'

class QuizResults extends React.Component {

    onRestartQuiz = () => {
        const { dispatch, navigation } = this.props
        dispatch(handleStartQuiz(navigation))
    }

    onFinishQuiz = () => {
        const { dispatch, navigation } = this.props
        const { deckId } = navigation.state.params
        navigation.navigate('DeckDetails', { deckId })
    }

    render() {
        const { correctAnswers, totalCards } = this.props

        return (
            <MainContainerView>
                <ScoreText>Your Score:</ScoreText>
                <ScoreText>{correctAnswers}/{totalCards}</ScoreText>

                <RestartQuizButton onPress={this.onRestartQuiz}>
                    <ButtonText>Restart Quiz</ButtonText>
                </RestartQuizButton>

                <BackToDeckButton onPress={this.onFinishQuiz}>
                    <ButtonText>Back to Deck</ButtonText>
                </BackToDeckButton>
            </MainContainerView>
        )
    }
}

const MainContainerView = styled.View`
    flex: 1;
    padding-top: 30;
    align-items: center;
    backgroundColor : ${white};
`

const ScoreText = styled.Text`
    font-size: 25px;
    padding-top: 20px;
    text-align: center;
`

const RestartQuizButton = styled.TouchableOpacity`
    margin-top: 30px;    
    padding: 15px;
    width: 60%;
    background-color: ${green};
    border-radius: 5;
`

const BackToDeckButton = styled.TouchableOpacity`
    margin-top: 30px;
    padding: 15px;
    width: 60%;
    background-color: ${purple};
    border-radius: 5;
`

const ButtonText = styled.Text`
    color: ${white};
    text-align: center;
`

function mapStateToProps(state, { navigation }) {
    const { deckId } = navigation.state.params
    const { decks, quiz } = state
    const deckCards = decks[deckId].cards

    return {
        correctAnswers: quiz[deckId].filter(card => card.isCorrect).length, 
        totalCards: deckCards.length
    }
}

export default connect(mapStateToProps)(QuizResults)