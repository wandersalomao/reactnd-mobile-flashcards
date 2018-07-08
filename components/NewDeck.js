import React from 'react'
import styled from 'styled-components'
import { white, gray, green } from '../utils/colors'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { requiredValidation } from '../utils/field-validation'
import InputField from './InputField'
import SubmitForm from './SubmitForm'
import { SubmissionError } from 'redux-form'
import { NavigationActions } from 'react-navigation'
import { handleSaveDeck } from '../actions/deck_actions'

class NewDeck extends React.Component {

    onSubmit = (values) => {
        const { title } = values
        const { dispatch, navigation, currentDeckTitles } = this.props

        if (currentDeckTitles.includes(title)) {
            throw new SubmissionError({ title: 'This deck title already exists', _error: 'Title already exists' })
        } else {
            dispatch(handleSaveDeck(title, navigation))
        }
    }

    render() {
        return (
            <ContainerView>
                <TitleText>What is the title of yout new Deck?</TitleText>
                
                <SubmitForm
                    form="newDeck"
                    buttonText="Save"
                    onSubmitForm={(values) => this.onSubmit(values)}>

                    <Field 
                        name="title" 
                        component={InputField}
                        placeholder="Title"
                        validate={[requiredValidation]} />
                </SubmitForm>
            </ContainerView>
        )
    }
}

const TitleText = styled.Text`
    font-size: 40px;
    text-align: center;
    margin: 35px 0px 35px 0px;
`

const ContainerView = styled.View`
    flex: 1;
    padding: 15px;
    align-items: center;
`

function mapStateToProps(state) {
    const { decks } = state

    return {
        currentDeckTitles: Object.keys(decks).map( id => decks[id].title )
    }
}

export default connect(mapStateToProps)(NewDeck)