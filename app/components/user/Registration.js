import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View, TextInput, Text, RefreshControl, ScrollView } from 'react-native';

import { changeUser } from '../../redux/user.slice';
import registerForPushNotifications from '../../lib/registerForPushNotifications';
import { SERVER } from '../../lib/constants';
import { validateEmail } from '../../lib/validation';

import { styles } from './styles';

function Registration({ navigation }) {
	const { t } = useTranslation();
	const lang = useSelector(state => state.language.value);
	const bgColour = useSelector(state => state.bgColour.value);
	const dispatch = useDispatch();

	const [userData, setUserData] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [err, setErr] = useState(null);
	const [refreshing, setRefreshing] = useState(false);
	const [showPassword, setShowPassword] = useState(null);

	const onChangeUserData = (text, field) => {
		setUserData(prev => ({
			...prev,
			...{[field]: text}
		}));
	};

	const sendUserData = async() => {
		const checkedEmail = await validateEmail(userData.email);
		if (!checkedEmail) return setErr('Please, write correct email');

		const token = await registerForPushNotifications();

		const resp = await fetch(`${SERVER}/signup`, {
			method: 'POST',
			body: JSON.stringify({
				userData,
				timezone: new Date().getTimezoneOffset()/60,
				language: lang,
				deviceToken: token.data,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await resp.json();
		if (resp.status !== 201) setErr(JSON.stringify(data));
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

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	return (
		<View style={[styles.container, { backgroundColor: bgColour }]}>
			<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				<TextInput
					textContentType='username'
					style={styles.input} 
					placeholder={t('Username')}
					value={userData.username.toString()}
					onChangeText={text => onChangeUserData(text, 'username')}
				/>
				<TextInput
					textContentType='emailAddress'
					keyboardType='email-address'
					style={styles.input} 
					placeholder={t('Email')}
					value={userData.email.toString()}
					onChangeText={text => onChangeUserData(text, 'email')}
				/>
				<TextInput
					textContentType='password'
					secureTextEntry={showPassword ? false : true}
					style={styles.input}
					placeholder={t('Password')}
					value={userData.password}
					onChangeText={text => onChangeUserData(text, 'password')} 
				/>
				<View style={styles.checkboxContainer}>
					<Text>Show password</Text>
					<Checkbox
						value={showPassword}
						onValueChange={setShowPassword}
						style={styles.checkbox}
					/>
				</View>
				{err && <Text style={styles.err}>{err}</Text>}
				<View style={[styles.btn, styles.btnRegistr]}>
					<Text style={styles.btnText} onPress={sendUserData}>{t('Sign Up')}</Text>
				</View>
			</ScrollView>
		</View>
	);
}

export default Registration;