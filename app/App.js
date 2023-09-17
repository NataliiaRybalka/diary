import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigator from './components/pages/DrawerNavigator';
import store from './redux/store';

import Registration from './components/user/Registration';
import RestoringPassword from './components/user/RestoringPassword';

const Stack = createStackNavigator();

function App() {

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Root' component={DrawerNavigator} options={{ headerShown: false }} />
				<Stack.Screen name="Forgot Password?" component={RestoringPassword} />
				<Stack.Screen name="Have not an Account?" component={Registration} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
const AppWrapper = () => {

	return (
		<Provider store={store}>
			<App />
		</Provider>
	)
}

export default AppWrapper;