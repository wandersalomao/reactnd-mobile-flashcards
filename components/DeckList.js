import React from 'react'
import { connect } from 'react-redux'
import { FlatList, TouchableOpacity, Platform, View, Text, Dimensions } from 'react-native'
import { white, gray } from '../utils/colors'
import styled from 'styled-components'
import { handleInitialData } from '../actions/shared_actions'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DeckTitleText, NumberOfCardsText } from './styled-components'
import { getNumberOfCardsText } from '../utils/helpers'

/**
 * Component that will be rendered when the list of decks is empty
 */
const EmptyList = () => (
    <EmptyContainerView>
        <MaterialCommunityIcons
            style={{ padding: 40 }}
            name='cards-outline'
            size={85}/>
        <Text style={{ fontSize: 30, padding: 10  }}>No Decks yet</Text>
        <Text style={{ fontSize: 20  }}>Tap the Add button to add your first Deck</Text>
    </EmptyContainerView>
)

class DeckList extends React.Component {

    keyExtractor = (item, index) => item.id

    renderItem = ({ item }) => (
        <DeckItemView>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetails', { deckId: item.id })}>
                <DeckTitleText>{item.title}</DeckTitleText>
                <NumberOfCardsText>{getNumberOfCardsText(item)}</NumberOfCardsText>
            </TouchableOpacity>
        </DeckItemView>    
    )

    onAddNewDeck = () => {
        this.props.navigation.navigate('NewDeck')
    }

    componentDidMount() {
        // load the initial data 
        this.props.dispatch(handleInitialData())
    }

    render() {
        const { decks } = this.props

        return (
            <MainContainerView>
                <FlatList
                    data={decks}
                    ListEmptyComponent={EmptyList}
                    keyExtractor={this.keyExtractor} 
                    renderItem={this.renderItem} />

                <FloatingActionButton activeOpacity={0.5} onPress={this.onAddNewDeck}>
                     <FloatingActionButtonImage source={ require('../images/action-button.png')} />
                </FloatingActionButton>

            </MainContainerView>
        );
    }
}

const EmptyContainerView = styled.View`
    flex-grow: 1; 
    flex: 1;
    align-items: center;
    justify-content: center;
`

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

function mapStateToProps(state) {
    const { decks } = state

    return {
        decks: Object.keys(decks)
            .map( id => decks[id] )
            .sort((a, b) => a.title.localeCompare(b.title) )
    }
}

export default connect(mapStateToProps)(DeckList)