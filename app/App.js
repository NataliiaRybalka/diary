import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';

import Footer from './components/pages/Footer';
import Header from './components/pages/Header';
// import Main from './components/pages/Main';
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
			<ScrollView>
				<Header user={user} bgColour={bgColour} />
				{/* <Main user={user} /> */}
			</ScrollView>
			<Footer />
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
