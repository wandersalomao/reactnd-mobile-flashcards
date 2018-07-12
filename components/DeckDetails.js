import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { white, green, purple, gray } from '../utils/colors'
import { DeckTitleText, NumberOfCardsText } from './styled-components'
import { getNumberOfCardsText } from '../utils/helpers'
import { handleStartQuiz } from '../actions/quiz_actions'

class DeckDetails extends React.Component {

    onAddNewCard = () => {
        const { navigation, deck } = this.props
        navigation.navigate('NewCard', { deckId: deck.id })
    }

    onStartQuiz = () => {
        const { dispatch, navigation } = this.props
        dispatch(handleStartQuiz(navigation))
    }

    render() {
        const { deck } = this.props
        const numberOfCards = deck.cards ? deck.cards.length : 0

        return (
            <MainContainerView>
                <DeckTitleText>{deck.title}</DeckTitleText>
                <NumberOfCardsText>{getNumberOfCardsText(deck)}</NumberOfCardsText>

                <AddCardButton onPress={this.onAddNewCard}>
                    <ButtonText>Add Card</ButtonText>
                </AddCardButton>

                { /* The Start Quiz Button will only be available if the deck has more than 1 card. */ }
                <StartQuizButton onPress={this.onStartQuiz}
                    disabled={numberOfCards <= 0} 
                    style={ numberOfCards > 0 ? { backgroundColor: green } : { backgroundColor: gray }}>
                    <ButtonText>Start Quiz</ButtonText>
                </StartQuizButton>
            </MainContainerView>
        )
    }
}

const MainContainerView = styled.View`
    flex: 1;
    padding-top: 50;
    align-items: center;
    backgroundColor : ${white};
`

const AddCardButton = styled.TouchableOpacity`
    margin-top: 30px;    
    padding: 15px;
    width: 60%;
    background-color: ${purple};
    border-radius: 5;
`

const ButtonText = styled.Text`
    text-align: center; 
    color: ${white};
    font-size: 15px;
`

const StartQuizButton = styled.TouchableOpacity`
    margin-top: 30px;
    padding: 15px;
    width: 60%;
    background-color: ${green};
    border-radius: 5;
`

function mapStateToProps(state, { navigation }) {
    const { deckId } = navigation.state.params
    const { decks } = state

    return {
        deck: decks[deckId]
    }
}

export default connect(mapStateToProps)(DeckDetails)