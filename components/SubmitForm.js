import React from 'react'
import { reduxForm } from 'redux-form'
import { white, gray, green } from '../utils/colors'
import styled from 'styled-components'
import PropTypes from 'prop-types'

class SubmitForm extends React.Component {

    static propTypes = {
        buttonText: PropTypes.string.isRequired,
        onSubmitForm: PropTypes.func.isRequired, 
        form: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)
        this.state = { isFormValid: false }
    }

    componentWillReceiveProps(nextProps) {
        /**
         * redux-form provides a prop named 'valid' that indicates if the form is valid or not
         * We are using this property here to change the state and enable/disable the button
         */
        const { valid } = nextProps
        const { isFormValid } = this.state

        if (valid !== isFormValid) {
            this.setState(() => ({ isFormValid: valid }))
        }
    }

    render() {
        // handleSubmit is provided by redux-form
        const { buttonText, handleSubmit, onSubmitForm } = this.props
        const { isFormValid } = this.state
        
        return (
            <ContainerView style={{ width: '100%' }}>
                {this.props.children}
                <SubmitButton disabled={!isFormValid} style={ isFormValid ? { backgroundColor: green } : { backgroundColor: gray }} onPress={handleSubmit(onSubmitForm)}>
                    <SubmitButtonText>{buttonText}</SubmitButtonText>
                </SubmitButton>
            </ContainerView>
        );
    }
}

const ContainerView = styled.View`
    width: 100%;
`

const SubmitButton = styled.TouchableOpacity`
    margin-top: 30px;    
    padding: 15px;
    width: 100%;
    background-color: ${green};
    border-radius: 5;
`

const SubmitButtonText = styled.Text`
    text-align: center; 
    color: ${white};
    font-size: 15px;
`

export default reduxForm({})(SubmitForm);