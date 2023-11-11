import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View, Text, Image } from 'react-native';

import { changeUser } from '../../redux/user.slice';
import registerForPushNotifications from '../../lib/registerForPushNotifications';
import { SERVER } from '../../lib/constants';

import { styles } from './styles';

const googleLogo = require('../../img/google.png');

function LoginGoogle({ setErr, navigation }) {
	const { t } = useTranslation();
	const language = useSelector(state => state.language.value);
	const dispatch = useDispatch();

	useEffect(()=>{
        GoogleSignin.configure({
            webClientId: '305191477071-d2cer08g8mrp8sdd8nteqjd11hqthbni.apps.googleusercontent.com', 
        })  
    },[]);

	const googleLogin = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			sendUserData(userInfo.user);
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
			<Text onPress={googleLogin}>{t('Sign in with')}</Text>
			<Image source={googleLogo} style={styles.logoGoogle} />
		</View>
	);
}

export default LoginGoogle;