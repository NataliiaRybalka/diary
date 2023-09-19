import { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env';
import { SERVER } from '../../lib/constants';

WebBrowser.maybeCompleteAuthSession();

const googleLogo = require('../../img/google.png');

const EXPO_REDIRECT_PARAMS = { useProxy: true, projectNameForProxy: '@nataliiarybalka/com.nataliiarybalka.app' };
const NATIVE_REDIRECT_PARAMS = { native: 'com.nataliiarybalka.app://', native: ''};
const REDIRECT_PARAMS = Constants.appOwnership === 'expo' ? EXPO_REDIRECT_PARAMS : NATIVE_REDIRECT_PARAMS;
const redirectUri = makeRedirectUri(REDIRECT_PARAMS);
// const redirectUri = 'https://auth.expo.io/@nataliiarybalka/com.nataliiarybalka.app';

function LoginGoogle({setErr}) {
	const [userInfo, setUserInfo] = useState(null);
	
	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: ANDROID_CLIENT_ID,
		expoClientId: EXPO_CLIENT_ID,
		iosClientId: IOS_CLIENT_ID,
		webClientId: WEB_CLIENT_ID,
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
			<Text onPress={() => promptAsync()}>Sign in with</Text>
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
		width: '40%',
		marginTop: 10,
		marginLeft: '30%',
		flexDirection: 'row'
	},
	logo: {
		width: 40,
		height: 40,
	}
});

export default LoginGoogle;