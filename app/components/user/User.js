import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View, TextInput, Text, RefreshControl, ScrollView } from 'react-native';

import { changeUser } from '../../redux/user.slice';
import { SERVER } from '../../lib/constants';

import { styles } from './styles';

function User({ navigation }) {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);
	const lang = useSelector(state => state.language.value);
	const user = useSelector(state => state.user.value);
	const dispatch = useDispatch();

	const [userData, setUserData] = useState({
		username: user?.username || '',
		email: user?.email || '',
		password: '',
		language: user?.language,
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

	const updateUserData = async() => {
		const resp = await fetch(`${SERVER}/user/${user.id}`, {
			method: 'PUT',
			body: JSON.stringify(userData),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await resp.json();
		if (resp.status !== 201) setErr(JSON.stringify(data));
		else {
			dispatch(changeUser(data));
			console.log(data);
			await AsyncStorage.setItem('user', JSON.stringify({
				username: userData.username,
				language: userData.language,
				email: user?.email,
				id: user?.id,
			}));
			setErr(null);
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
				<View style={styles.btn}>
					<Text style={styles.btnText} onPress={updateUserData}>{t('Update')}</Text>
				</View>

				{
					lang === 'en' 
					? <>
						<Text onPress={() => navigation.navigate('Set up notifications')} style={styles.question}>
							{t('Set up notifications')}
						</Text>
						<Text onPress={() => navigation.navigate('Delete Account')} style={styles.question}>
							{t('Delete Account')}
						</Text>
					</>
					: lang === 'ru'
						? <>
							<Text onPress={() => navigation.navigate('Настройка уведомлений')} style={styles.question}>
								{t('Set up notifications')}
							</Text>
							<Text onPress={() => navigation.navigate('Удалить аккаунт')} style={styles.question}>
								{t('Delete Account')}
							</Text>
						</>
						: <>
							<Text onPress={() => navigation.navigate('Налаштувати сповіщень')} style={styles.question}>
								{t('Set up notifications')}
							</Text>
							<Text onPress={() => navigation.navigate('Видалити акаунт')} style={styles.question}>
								{t('Delete Account')}
							</Text>
						</>
				}
			</ScrollView>
		</View>
	);
}

export default User;