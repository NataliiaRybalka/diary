import { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

import { SERVER } from '../../lib/constants';

WebBrowser.maybeCompleteAuthSession();

const googleLogo = require('../../img/google.png');

const EXPO_REDIRECT_PARAMS = { useProxy: true, projectNameForProxy: '@nataliiarybalka/com.nataliiarybalka.app' };
const NATIVE_REDIRECT_PARAMS = { native: 'com.nataliiarybalka.app://' };
const REDIRECT_PARAMS = Constants.appOwnership === 'expo' ? EXPO_REDIRECT_PARAMS : NATIVE_REDIRECT_PARAMS;
const redirectUri = makeRedirectUri(REDIRECT_PARAMS);

function LoginGoogle({setErr}) {
	const [userInfo, setUserInfo] = useState(null);

	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: '8121478236-rkukk5ah7bifgss0kuv2jpaquhddmg86.apps.googleusercontent.com',
		expoClientId: '8121478236-v4no19iipkiumqv7qrc0ooq5je6kq39e.apps.googleusercontent.com',
		iosClientId: '8121478236-milkriiu8ek9h5q26tbt5b13hhvs1j42.apps.googleusercontent.com',
		webClientId: '8121478236-tt46je2ehapucl101tp8j2q04gnmjsci.apps.googleusercontent.com',
		redirectUri,
	}, { useProxy: true });

	useEffect(() => {
		handleSignin();
	}, [response]);

	const handleSignin = async () => {
		if (response?.type === 'success') await getUserInfo(response.authentication.accessToken);
	};

	const getUserInfo = async (token) => {
		if (!token) return;
		try {
			const response = await fetch(
				'https://www.googleapis.com/userinfo/v2/me',
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			const user = await response.json();
			await AsyncStorage.setItem('user', JSON.stringify(user));
			setUserInfo(user);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<View style={styles.btn}>
			<Image source={googleLogo} style={styles.logo} />
		</View>
	);
}

const styles = StyleSheet.create({
	btn: {
		height: 40,
		borderRadius: 25,
		borderColor: '#000000',
		borderStyle: 'solid',
		borderWidth: 1,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: '30%',
		marginTop: 10,
		marginLeft: '35%',
	},
	logo: {
		width: 40,
		height: 40,
	}
});

export default LoginGoogle;