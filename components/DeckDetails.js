import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { white, green, purple } from '../utils/colors'
import { DeckTitleText, NumberOfCardsText } from './styled-components'
import { getNumberOfCardsText } from '../utils/helpers'

class DeckDetails extends React.Component {

    // static navigationOptions = ({ navigation }) => {
    //     const { screenTitle } = navigation.state.params
    //     return {
    //         title: screenTitle
    //     }
    // }

    // componentDidMount() {
    //     const { navigation, deck } = this.props
    //     navigation.setParams({
    //         screenTitle: deck.title
    //     })
    // }

    onAddNewCard = () => {
        const { navigation, deck } = this.props
        navigation.navigate('NewCard', { deckId: deck.id })
    }

    onStartQuiz = () => {
        console.log('Start Quiz')
    }

    render() {
        const { deck } = this.props

        return (
            <MainContainerView>
                <DeckTitleText>{deck.title}</DeckTitleText>
                <NumberOfCardsText>{getNumberOfCardsText(deck)}</NumberOfCardsText>

                <AddCardButton onPress={this.onAddNewCard}>
                    <ButtonText>Add Card</ButtonText>
                </AddCardButton>
                <StartQuizButton onPress={this.onStartQuiz}>
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