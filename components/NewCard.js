import React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { requiredValidation } from '../utils/field-validation'
import InputField from './InputField'
import SubmitForm from './SubmitForm'
import { handleSaveCard } from '../actions/card_actions'

class NewCard extends React.Component {

    onSubmit = (values) => {
        const { question, answer } = values
        const { dispatch, navigation } = this.props
        const deck = navigation.state.params.deckId
        dispatch(handleSaveCard( { question, answer, deck }, navigation))
    }

    render() {
        return (
            <ContainerView>
                <SubmitForm
                    form="newDeck"
                    buttonText="Save"
                    onSubmitForm={(values) => this.onSubmit(values)}>

                    <Field 
                        name="question" 
                        component={InputField}
                        placeholder="Question"
                        validate={[requiredValidation]} />

                    <Field 
                        name="answer" 
                        component={InputField}
                        placeholder="Answer"
                        validate={[requiredValidation]} />

                </SubmitForm>
            </ContainerView>
        )
    }
}

const ContainerView = styled.View`
    flex: 1;
    padding: 15px;
    align-items: center;
`

// function mapStateToProps(state, { navigation }) {
//     const { deckId } = navigation.state.params
//     const { decks } = state

//     return {
//         deck: decks[deckId]
//     }
// }

// function mapStateToProps(state) {
//     const { decks } = state

//     return {
//         currentDeckTitles: Object.keys(decks).map( id => decks[id].title )
//     }
// }

export default connect()(NewCard)