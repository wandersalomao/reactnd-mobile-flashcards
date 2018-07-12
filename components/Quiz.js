import React from 'react'
import { Animated, Platform } from 'react-native'
import styled from 'styled-components'
import { white, green, purple, red } from '../utils/colors'
import { connect } from 'react-redux'
import { handleSaveQuizAnswer } from '../actions/quiz_actions'

class Quiz extends React.Component {

    constructor(props) {
        super(props)
        this.state = { displayQuestion: true }
    }

    static navigationOptions = ({ navigation }) => {
        const { screenTitle } = navigation.state.params
        return {
            title: screenTitle
        }
    }

    componentDidMount() {
        const { navigation, totalCards } = this.props
        const { currentCardIndex } = navigation.state.params
        navigation.setParams({
            screenTitle: `Quiz: ${currentCardIndex + 1}/${totalCards}`
        })
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        })
        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        })
    }
    
    flipCard = () => {
        if (this.value >= 90) {
            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }

        const { displayQuestion } = this.state
        this.setState(() => ({ displayQuestion: !displayQuestion }))
    }
    
    onAnswerQuestion = (isCorrect) => {
        const { dispatch, navigation, currentCard } = this.props
        dispatch(handleSaveQuizAnswer({
            cardId: currentCard.id,
            isCorrect: isCorrect
        }, navigation))
    }

    render() {
        const { currentCard, currentCardIndex, totalCards } = this.props
        const { displayQuestion } = this.state

        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }

        return (
            <MainContainerView>
                <QuestionContainerView> 
                    <FlipContainerView style={[frontAnimatedStyle, { opacity: Platform.OS === 'ios' ? 1 : this.frontOpacity }]}>
                        <QuestionAnswerText>{currentCard.question}</QuestionAnswerText>
                    </FlipContainerView>

                    <FlipContainerBackView style={[backAnimatedStyle, { opacity: Platform.OS === 'ios' ? 1 : this.backOpacity }]}>
                        <QuestionAnswerText>{currentCard.answer}</QuestionAnswerText>
                    </FlipContainerBackView>
                </QuestionContainerView>

                <QuestionAnswerFlipButton onPress={this.flipCard}>
                    <QuestionAnswerFlipButtonText>{displayQuestion ? 'Answer' : 'Question'}</QuestionAnswerFlipButtonText>
                </QuestionAnswerFlipButton>

                <CorrectButton onPress={() => this.onAnswerQuestion(true)}>
                    <ButtonText>Correct</ButtonText>
                </CorrectButton>

                <IncorrectButton onPress={() => this.onAnswerQuestion(false)}>
                    <ButtonText>Incorrect</ButtonText>
                </IncorrectButton>

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

const QuestionContainerView = styled.View`
    width: 100%;
    alignItems: center;
`

const FlipContainerView = styled(Animated.View)`
    width: 80%;
    backface-visibility: hidden;
`

const FlipContainerBackView = styled(Animated.View)`
    width: 80%;
    backface-visibility: hidden;    
    position: absolute;
    top: 0;
`

const QuestionAnswerText = styled.Text`
    font-size: 25px;
    padding-top: 20px;
    text-align: center;
`

const QuestionAnswerFlipButton = styled.TouchableOpacity`
    margin-top: 10px;
    padding: 15px;
    width: 60%;
`

const QuestionAnswerFlipButtonText = styled.Text`
    text-align: center; 
    color: ${purple};
    font-size: 25px;
`

const CorrectButton = styled.TouchableOpacity`
    margin-top: 30px;    
    padding: 15px;
    width: 60%;
    background-color: ${green};
    border-radius: 5;
`

const IncorrectButton = styled.TouchableOpacity`
    margin-top: 30px;
    padding: 15px;
    width: 60%;
    background-color: ${red};
    border-radius: 5;
`

const ButtonText = styled.Text`
    text-align: center; 
    color: ${white};
    font-size: 15px;
`

function mapStateToProps(state, { navigation }) {
    const { deckId, currentCardIndex } = navigation.state.params
    const { decks, cards } = state
    const deckCards = decks[deckId].cards
    const deckCardId = deckCards.sort((a, b) => a.localeCompare(b))[currentCardIndex]
    const currentCard = cards[deckCardId]

    return {
        currentCard,
        totalCards: deckCards.length
    }
}

export default connect(mapStateToProps)(Quiz)