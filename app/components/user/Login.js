import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, TextInput, Text, RefreshControl, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';

import { changeUser } from '../../redux/user.slice';
import LoginGoogle from './LoginGoogle';
import { SERVER } from '../../lib/constants';
import { validateEmail } from '../../lib/validation';

import LoginGoogleCopy from './LoginGoogleCopy';

function Login({ navigation }) {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);
	const lang = useSelector(state => state.language.value);
	const dispatch = useDispatch();

	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});
	const [err, setErr] = useState(null);
	const [refreshing, setRefreshing] = useState(false);
	const [showPassword, setShowPassword] = useState(null);

	const onChangeUserData = (text, field) => {
		setErr(null);
		setUserData(prev => ({
			...prev,
			...{[field]: text}
		}));
	};

	const sendUserData = async() => {
		const checkedEmail = await validateEmail(userData.email);
		if (!checkedEmail) return setErr('Please, write correct email');

		const resp = await fetch(`${SERVER}/signin`, {
			method: 'POST',
			body: JSON.stringify(userData),
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
				<View style={styles.btn}>
					<Text style={styles.btnText} onPress={sendUserData}>{t('Sign in')}</Text>
				</View>

				<LoginGoogle setErr={setErr} />
				<LoginGoogleCopy setErr={setErr} />
				{
					lang === 'en' 
					? <>
						<Text onPress={() => navigation.navigate('Restore Password')} style={styles.question}>
							{t('Forgot password?')}
						</Text>
						<Text onPress={() => navigation.navigate('Register')} style={styles.question}>
							{t('Have not an Account?')}
						</Text>
					</>
					: lang === 'ru'
						? <>
							<Text onPress={() => navigation.navigate('Восстановить пароль')} style={styles.question}>
								{t('Forgot password?')}
							</Text>
							<Text onPress={() => navigation.navigate('Регистрация')} style={styles.question}>
								{t('Have not an Account?')}
							</Text>
						</>
						: <>
							<Text onPress={() => navigation.navigate('Відновити пароль')} style={styles.question}>
								{t('Forgot password?')}
							</Text>
							<Text onPress={() => navigation.navigate('Реєстрація')} style={styles.question}>
								{t('Have not an Account?')}
							</Text>
						</>
				}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		textAlign: 'center',
		justifyContent: 'center',
		fontSize: 16,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
	},
	err: {
		color: '#ff0000',
		textAlign: 'center',
	},
	question: {
		textAlign: 'center',
		marginTop: 10,
		color: 'blue'
	},
	btn: {
		height: 40,
		borderRadius: 25,
		borderColor: '#000000',
		borderStyle: 'solid',
		borderWidth: 1,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: '50%',
		marginTop: 10,
		marginLeft: '25%'
	},
	btnText: {
		fontSize: 18,
		fontWeight: '700',
	},
	checkboxContainer: {
		justifyContent: 'center',
		flexDirection: 'row'
	},
	checkbox: {
		marginLeft: 10
	}
});

export default Login;