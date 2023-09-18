import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, TextInput, Text, RefreshControl, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';

import { changeUser } from '../../redux/user.slice';
import { SERVER } from '../../lib/constants';

function User() {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);
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
			</ScrollView>
		</View>

		// 		<div className="signup_link">
		// 			<Link to='/notifications'>{t('Set up notifications')}</Link>
		// 		</div>
		// 		<div className="signup_link">
		// 			<Link to='/delete-account'>{t('Delete Account')}</Link>
		// 		</div>
		// 	</div>
		// </div>
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

export default User;