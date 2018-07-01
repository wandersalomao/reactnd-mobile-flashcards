import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { createStackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import { darkPurple, purple, white } from './utils/colors'

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
			title: "Decks", 
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple,
			}
		}
	}
})

export default class App extends React.Component {
  render() {
    return (
		<View style={{ flex: 1 }}>
			<AppStatusBar backgroundColor={darkPurple} barStyle="light-content" />
			<MainNavigator />
		</View>		
    );
  }
}