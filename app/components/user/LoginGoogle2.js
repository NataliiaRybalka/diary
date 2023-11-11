import { useDispatch, useSelector } from 'react-redux';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';
import { View, Image, Text, Button } from 'react-native';

import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env';
import { changeUser } from '../../redux/user.slice';
import registerForPushNotifications from '../../lib/registerForPushNotifications';
import { SERVER } from '../../lib/constants';

import { styles } from './styles';

const googleLogo = require('../../img/google.png');

WebBrowser.maybeCompleteAuthSession();

function LoginGoogle({ setErr, navigation }) {
	const { t } = useTranslation();
	const language = useSelector(state => state.language.value);
	const dispatch = useDispatch();

	const signin = async () => {
		const redirectUri = AuthSession.getRedirectUrl();
		// console.log('aaa',redirectUri,Constants.appOwnership );

		// const response = await AuthSession.startAsync({
		// authUrl: `https://accounts.google.com/o/oauth2/auth?client_id=416637401596-ft1d2e05bc9ebtt4ld7ghmgop8kr36qh.apps.googleusercontent.com&redirect_uri=${redirectUri}&response_type=token&scope=openid%20profile%20email`
		// });
				

		const response = await AuthSession.startAsync({
		authUrl: Constants.appOwnership === 'expo'
			? `https://accounts.google.com/o/oauth2/auth?client_id=${EXPO_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=token&scope=openid%20profile%20email`
			: Constants.appOwnership === 'android'
				? `https://accounts.google.com/o/oauth2/auth?client_id=${ANDROID_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=token&scope=openid%20profile%20email`
				: Constants.appOwnership === 'ios'
					? `https://accounts.google.com/o/oauth2/auth?client_id=${IOS_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=token&scope=openid%20profile%20email`
					: `https://accounts.google.com/o/oauth2/auth?client_id=${WEB_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=token&scope=openid%20profile%20email`
		});
		
		if (response?.type === 'success') await getUserInfo(response.params.access_token);
	};

	const getUserInfo = async (token) => {
		if (!token) return;
		try {
			const response = await fetch(
				"https://www.googleapis.com/userinfo/v2/me",
				{
				headers: { Authorization: `Bearer ${token}` },
				}
			);
		
			const user = await response.json();
			sendUserData(user);
		} catch (e) {
			console.log(e);
		}
	};

	const sendUserData = async(userData) => {
		const token = await registerForPushNotifications();

		const resp = await fetch(`${SERVER}/signin-google`, {
			method: 'POST',
			body: JSON.stringify({
				username: userData.name,
				email: userData.email,
				timezone: new Date().getTimezoneOffset()/60,
				deviceToken: token.data,
				language,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await resp.json();
		if (resp.status !== 200) setErr(JSON.stringify(data));
		else {
			dispatch(changeUser(data));
			await AsyncStorage.setItem('user', JSON.stringify({
				username: data.username,
				email: data.email,
				id: data._id,
				role: data.role,
			}));
			await AsyncStorage.setItem('lang', data.language);
			setErr(null);
			navigation.navigate('Root');
		}
	};

	return (
		<View style={[styles.btn, styles.btnGoogle]}>
			<Text onPress={signin}>{t('Sign in with')}</Text>
			<Image source={googleLogo} style={styles.logoGoogle} />
		</View>
	);
}

export default LoginGoogle;