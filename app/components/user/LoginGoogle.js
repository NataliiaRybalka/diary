import { useState, useEffect } from 'react';
import { Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';

import { SERVER } from '../../lib/constants';

function LoginGoogle({setErr}) {
	const [userInfo, setUserInfo] = useState(null);

	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: '8121478236-rkukk5ah7bifgss0kuv2jpaquhddmg86.apps.googleusercontent.com',
		expoClientId: '8121478236-v4no19iipkiumqv7qrc0ooq5je6kq39e.apps.googleusercontent.com',
		iosClientId: '8121478236-milkriiu8ek9h5q26tbt5b13hhvs1j42.apps.googleusercontent.com',
		webClientId: '8121478236-tt46je2ehapucl101tp8j2q04gnmjsci.apps.googleusercontent.com',
		redirectUri: makeRedirectUri({
			scheme: 'app',
			path: '/oauth2', preferLocalhost: true
		}),
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
	console.log('bbbbbbbbb', userInfo);

	return (
		<Button title='Sign in with Google' onPress={() => promptAsync()} />
	);
}

export default LoginGoogle;