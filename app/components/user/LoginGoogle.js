import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';

import { changeUser } from '../../redux/user.slice';
import registerForPushNotifications from '../../lib/registerForPushNotifications';
import { SERVER } from '../../lib/constants';

import { styles } from './styles';

function LoginGoogle({ setErr, navigation }) {
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
		<GoogleSigninButton
			style={styles.btnGoogle}
			color={GoogleSigninButton.Color.Dark}
			onPress={googleLogin}
		/>
	);
}

export default LoginGoogle;