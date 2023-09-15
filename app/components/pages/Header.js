import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from '../../i18n';
import HeaderMenu from './HeaderMenu';
import { SERVER } from '../../lib/constants';

const logo = require ('../../img/logo-circle.png');


function Header({ user, bgColour }) {
	const language = useSelector(state => state.language.value);
	// const bgColour = useSelector(state => state.bgColour.value);

	const setBgColor = async () => await AsyncStorage.setItem('bgColour', bgColour);
	const setLang = async () => await AsyncStorage.setItem('lang', language);

	// const sendLanguage = async () => {
	// 	if (!user) return;

	// 	const resp = await fetch(`${SERVER}/user/${user.id}`, {
	// 		method: 'PUT',
	// 		body: JSON.stringify({language}),
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	});

	// 	if (resp.status === 201) localStorage.setItem('lang', language);
	// };

	useEffect(() => {
        i18n.changeLanguage(language);
		setLang();
		// sendLanguage();
	}, [language]);

	useEffect(() => {
		setBgColor();
	}, [bgColour]);

	return (
		<View style={styles.header}>
			<HeaderMenu />
			<Image source={logo} style={styles.logo} />
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 10,
		paddingRight: 10,
		height: 40,
	},
	logo: {
		height: 40,
		width: 40,
	}
});

export default Header;
