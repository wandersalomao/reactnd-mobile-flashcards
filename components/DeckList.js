import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Platform } from 'react-native'
import { white, gray } from '../utils/colors'

export default class App extends React.Component {

    keyExtractor = (item, index) => item.deck

    renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => 
                this.props.navigation.navigate('EntryDetail', { entryId: item.deck })}>
                <Text style={styles.deckTitle}>{item.deck}</Text>
                <Text style={styles.deckCards}>{item.numberOfCards} card(s)</Text>
            </TouchableOpacity>
        </View>
    )

    render() {
        return (
            <View style={styles.mainContainer}>

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

                <TouchableOpacity activeOpacity={0.5} style={styles.touchableOpacityStyle} >
                     <Image source={ require('../images/action-button.png')} style={styles.floatingButtonStyle} />
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
 
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 4,
        padding: 20,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 17,
        alignItems: 'center', 
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },

    mainContainer: {
        flex: 1,
        backgroundColor : '#F5F5F5'
    },

    deckTitle: {
        fontSize: 25, 
        // fontWeight: 'bold',
        paddingTop: 20,
        textAlign: 'center'
    },

    deckCards: {
        fontSize: 20, 
        paddingTop: 10, 
        paddingBottom: 20, 
        color: gray, 
        textAlign: 'center'
    },

    touchableOpacityStyle:{
        position: 'absolute',
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30
    },
   
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 75,
        height: 75,
    }
});