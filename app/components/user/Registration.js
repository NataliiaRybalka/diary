import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';

import { SERVER } from '../../lib/constants';

function Registration() {
	const { t } = useTranslation();
	const language = useSelector(state => state.language.value);

	const [userData, setUserData] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [err, setErr] = useState(null);

	const onChangeUserData = (e) => {
		setUserData(prev => ({
			...prev,
			...{[e.target.name]: e.target.value}
		}));
	};

	const sendUserData = async() => {
		const resp = await fetch(`${SERVER}/signup`, {
			method: 'POST',
			body: JSON.stringify({
				userData,
				timezone: new Date().getTimezoneOffset()/60,
				language,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await resp.json();
		if (resp.status !== 201) setErr(JSON.stringify(data));
		else {
			localStorage.setItem('user', JSON.stringify({
				username: data.username,
				email: data.email,
				id: data._id,
				role: data.role,
			}));
			localStorage.setItem('lang', data.language);
			setErr(null);
			window.location.reload();
		}
	};

	return (
		// <div className="container">
		// 	{!!localStorage.getItem('user') && <Navigate replace to = '/' />}
		// 	<div className="center">
		// 		<h1>{t('Register')}</h1>
		// 		<div className='form'>
		// 			<div className="txt_field">
		// 				<input type="text" name="username" required onChange={e => onChangeUserData(e)} />
		// 				<span></span>
		// 				<label>{t('Username')}</label>
		// 			</div>
		// 			<div className="txt_field">
		// 				<input type="email" name="email" required onChange={e => onChangeUserData(e)} />
		// 				<span></span>
		// 				<label>{t('Email')}</label>
		// 			</div>
		// 			<div className="txt_field">
		// 				<input type="password" name="password" required onChange={e => onChangeUserData(e)} />
		// 				<span></span>
		// 				<label>{t('Password')}</label>
		// 			</div>
		// 			{err && <p className='pError'>{err}</p>}
		// 			<button className='submit' onClick={sendUserData}>{t('Sign Up')}</button>
		// 			<div className="signup_link">
		// 				{t('Have an Account?')} <Link to='/signin'>{t('Login Here')}</Link>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
		<View>
			<Text>Registration</Text>
		</View>
	);
}

export default Registration;