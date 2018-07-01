import React from 'react'
// import { Text, View, FlatList, TouchableOpacity, Image, Platform } from 'react-native'
import { FlatList, TouchableOpacity, Platform } from 'react-native'
import { white, gray } from '../utils/colors'
import styled from 'styled-components'

export default class App extends React.Component {

    keyExtractor = (item, index) => item.deck

    renderItem = ({ item }) => (
        <DeckItemView>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EntryDetail', { entryId: item.deck })}>
                <DeckTitleText>{item.deck}</DeckTitleText>
                <NumberOfCardsText>{item.numberOfCards} {item.numberOfCards > 1 ? 'cards' : 'card'}</NumberOfCardsText>
            </TouchableOpacity>
        </DeckItemView>    
    )

    render() {
        return (
            <MainContainerView>

                <FlatList
                    data={[
                        {deck: 'This is deck 1', numberOfCards: 1},
                        {deck: 'This is deck 2', numberOfCards: 2},
                        {deck: 'This is deck 3', numberOfCards: 3},
                        {deck: 'This is deck 4', numberOfCards: 4},
                        {deck: 'This is deck 5', numberOfCards: 5},
                        {deck: 'This is deck 6', numberOfCards: 6},
                        {deck: 'This is deck 7', numberOfCards: 7},
                        {deck: 'This is deck 8', numberOfCards: 8},
                        {deck: 'This is deck 9', numberOfCards: 9},
                        {deck: 'This is deck 10', numberOfCards: 10},
                        {deck: 'This is deck 11', numberOfCards: 11},
                    ]} 
                    keyExtractor={this.keyExtractor} 
                    renderItem={this.renderItem} />

                <FloatingActionButton activeOpacity={0.5}>
                     <FloatingActionButtonImage source={ require('../images/action-button.png')} />
                </FloatingActionButton>

            </MainContainerView>
        );
    }
}

const DeckItemView = styled.View`
    background-color: ${white};
    border-radius: ${Platform.OS === 'ios' ? 16 : 4};
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
    margin-bottom: 2px;
    align-items: center;
    shadow-radius: 3;
    shadow-opacity: 0.8;
    shadow-color: 'rgba(0, 0, 0, 0.24)';
    shadow-offset: 0px 3px;
`

const MainContainerView = styled.View`
    flex: 1;
    backgroundColor : #F5F5F5;
` 

const DeckTitleText = styled.Text`
    font-size: 25px;
    padding-top: 20px;
    text-align: center;
`

const NumberOfCardsText = styled.Text`
    font-size: 20px; 
    padding-top: 10px; 
    padding-bottom: 20px; 
    color: ${gray};
    text-align: center;
`

const FloatingActionButton = styled.TouchableOpacity`
    position: absolute;
    width: 75px;
    height: 75px;
    align-items: center;
    justify-content: center;
    right: 20px;
    bottom: 20px;  
`

const FloatingActionButtonImage = styled.Image`
    resize-mode: contain;
    width: 75px;
    height: 75px;
`