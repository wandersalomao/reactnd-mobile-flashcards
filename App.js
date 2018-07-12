import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { createStackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import QuizResults from './components/QuizResults'
import DeckDetails from './components/DeckDetails'
import { darkPurple, purple, white } from './utils/colors'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import { setLocalNotification } from './utils/helpers'

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
	}, 
	DeckDetails: {
		screen: DeckDetails,
		navigationOptions: {
			title: "Deck Details"
		}
	},
	NewCard: {
		screen: NewCard,
		navigationOptions: {
			title: "New Card"
		}
	}, 
	Quiz: {
		screen: Quiz
	}, 
	QuizResults: {
		screen: QuizResults, 
		navigationOptions:  {
			title: 'Quiz Results',
			headerLeft: null // Disable the back button
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

	componentDidMount() {
		setLocalNotification()
	}

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