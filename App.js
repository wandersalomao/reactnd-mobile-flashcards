import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { createStackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import { darkPurple, purple, white } from './utils/colors'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

function AppStatusBar ({backgroundColor, ...props}) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

const MainNavigator = createStackNavigator({
	Home: {
		screen: DeckList,
		navigationOptions: {
			title: "Decks"
		}
	}, 
	NewDeck: {
		screen: NewDeck,
		navigationOptions: {
			title: "New Deck"
		}
	}
}, {
	navigationOptions: {
		headerTintColor: white,
		headerStyle: {
			backgroundColor: purple,
		}
	}
})

export default class App extends React.Component {
  render() {
    return (
		<Provider store={createStore(reducer, middleware)}>
			<View style={{ flex: 1 }}>
				<AppStatusBar backgroundColor={darkPurple} barStyle="light-content" />
				<MainNavigator />
			</View>
		</Provider>	
    );
  }
}