import 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';

import Navigator from './components/pages/Navigator';
import store from './redux/store';

function App() {
	const bgColour = useSelector(state => state.bgColour.value);

	const [user, setUser] = useState();

	const getData = async () => {
		try {
			const user = await AsyncStorage.getItem('user');
			setUser(user);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<View style={styles.app}>
			<Navigator user={user} bgColour={bgColour} />
		</View>
	);
}
const AppWrapper = () => {

	return (
		<Provider store={store}>
			<App />
		</Provider>
	)
}

const styles = StyleSheet.create({
	app: {
		marginTop: 25,
		flex: 1,
		textAlign: 'center',
		fontSize: 16,
	},
});

export default AppWrapper;
