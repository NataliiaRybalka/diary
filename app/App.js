import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './components/pages/Header';
// import Main from './components/pages/Main';
import Footer from './components/pages/Footer';

function App() {
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
			<Header user={user} />
			{/* <Main user={user} /> */}
			<Footer />
		</View>
	);
}

const styles = StyleSheet.create({
	app: {
		textAlign: 'center',
		margin: 0,
		fontSize: '16px',
		width: '100vw',
		minHeight: '100vh',
		position: 'relative',
	},
});

export default App;
