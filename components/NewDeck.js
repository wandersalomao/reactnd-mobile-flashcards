import React from 'react'
import styled from 'styled-components'
import { white, gray, green } from '../utils/colors'
import { Field } from 'redux-form'
import { requiredValidation } from '../utils/field-validation'
import InputField from './InputField'
import SubmitForm from './SubmitForm'
import { SubmissionError } from 'redux-form'

export default class NewDeck extends React.Component {

    onSubmit = (values) => {
        console.log(values)
        throw new SubmissionError({ title: 'This is an error', _error: 'Error failed!' })
        // const { username, name } = values
        // dispatch(register(username, name))
    }

    render() {
        return (
            <ContainerView>
                <TitleText>What is the title of yout new Deck?</TitleText>
                
                <SubmitForm 
                    form="newDeck"
                    buttonText="Register"
                    onSubmitForm={(values) => this.onSubmit(values)}>

                    <Field 
                        name="title" 
                        component={InputField}
                        placeholder="Title"
                        validate={[requiredValidation]} />
                </SubmitForm>

                {/* <TitleTextInput placeholder="Title" underlineColorAndroid='transparent'/>
                
                <SubmitButton onPress={() => this.props.navigation.navigate('EntryDetail')}>
                    <SubmitButtonText>Submit</SubmitButtonText>
                </SubmitButton> */}
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

const TitleTextInput = styled.TextInput`
    width: 100%;
    height: 50px;
    border-radius: 5;
    padding: 10px;
    border-color: ${gray}    
    background-color: ${white}
`