import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { white, gray, red } from '../utils/colors'

export default class InputField extends React.Component {
    render() {
        const { input: { value, onChange, onBlur, ...restInput }, placeholder, meta: { dirty, error } } = this.props

        return (
            <View> 
                <TitleTextInput 
                    underlineColorAndroid='transparent'
                    placeholder={placeholder} 
                    onChangeText={onChange} 
                    onBlur={onBlur}
                    value={value}
                    {...restInput} />
                    
                        {dirty && error && <ErrorText>{error}</ErrorText>}
            </View>
        );
    }
}

const TitleTextInput = styled.TextInput`
    width: 100%;
    height: 50px;
    border-radius: 5;
    padding: 10px;
    border-color: ${gray}    
    background-color: ${white}
`

const ErrorText = styled.Text`
    color: ${red}; 
    margin-top: 10px;
`