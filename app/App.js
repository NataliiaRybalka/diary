import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { FULCRUM, SERVER } from './lib/constants';

export default function App() {
	const [data, setData] = useState(null);

	const getData = async () => {
		const res = await fetch(`${SERVER}/metaphorical-cards/${FULCRUM}/card`);
		const data = await res.json();
		setData(data.descriptionEn);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
			<Text>{data}</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
