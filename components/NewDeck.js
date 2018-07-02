import React from 'react'
import styled from 'styled-components'
import { white, gray, green } from '../utils/colors'

export default class NewDeck extends React.Component {

    render() {
        return (
            <ContainerView>
                <TitleText>What is the title of yout new Deck?</TitleText>
                
                <TitleTextInput placeholder="Title" underlineColorAndroid='transparent'/>
                
                <SubmitButton onPress={() => this.props.navigation.navigate('EntryDetail')}>
                    <SubmitButtonText>Submit</SubmitButtonText>
                </SubmitButton>
            </ContainerView>
        )
    }
}

const SubmitButton = styled.TouchableOpacity`
    margin: 30px;
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