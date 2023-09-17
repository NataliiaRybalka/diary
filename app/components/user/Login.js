import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, TextInput, Button, Text, RefreshControl, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import LoginGoogle from './LoginGoogle';
import { changeUser } from '../../redux/user.slice';
import { SERVER } from '../../lib/constants';
import { validateEmail } from '../../lib/validation';

function Login() {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);
	const dispatch = useDispatch();

	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});
	const [err, setErr] = useState(null);
	const [refreshing, setRefreshing] = useState(false);

	const onChangeUserData = (text, field) => {
		setErr(null);
		setUserData(prev => ({
			...prev,
			...{[field]: text}
		}));
	};

	const sendUserData = async() => {
		const checkedEmail = await validateEmail(userData.email);
		if (!checkedEmail) return setErr('Please, write correct email')

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
					placeholder='Email'
					value={userData.email.toString()}
					onChangeText={text => onChangeUserData(text, 'email')}
				/>
				<TextInput
					textContentType='password'
					secureTextEntry={true}
					style={styles.input}
					placeholder='Password'
					value={userData.password}
					onChangeText={text => onChangeUserData(text, 'password')} 
				/>
				{err && <Text style={styles.err}>{err}</Text>}
				<Button onPress={sendUserData} title={t('Sign in')} />
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
		padding: 10,
	},
	err: {
		color: '#ff0000',
		textAlign: 'center',
	}
});

export default Login;

{/* <div className='form'>
					<LoginGoogle setErr={setErr} />
					<div className="signup_link">
						{t('Forgot password?')} <Link to='/restore-password'>{t('Restore')}</Link>
					</div>
					<div className="signup_link">
						{t('Have not an Account?')} <Link to='/signup'>{t('Register Here')}</Link>
					</div>
				</div> */}