import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LoginGoogle from './LoginGoogle';
import { SERVER } from '../../lib/constants';

import './Registration.css';

function Login() {
	const { t } = useTranslation();

	const [userData, setUserData] = useState({
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
			localStorage.setItem('user', JSON.stringify({
				username: data.user.username,
				email: data.user.email,
				id: data.user._id,
			}));
			localStorage.setItem('lang', data.user.language);
			setErr(null);
			window.location.reload();
		}
	};

	return (
		<div className="container">
			{!!localStorage.getItem('user') && <Navigate replace to = '/' />}
			<div className="center">
				<h1>{t('Login')}</h1>
				<div className='form'>
					<div className="txt_field">
						<input type="email" name="email" required onChange={e => onChangeUserData(e)} />
						<span></span>
						<label>{t('Email')}</label>
					</div>
					<div className="txt_field">
						<input type="password" name="password" required onChange={e => onChangeUserData(e)} />
						<span></span>
						<label>{t('Password')}</label>
					</div>
					{err && <p className='pError'>{err}</p>}
					<button className='submit' onClick={sendUserData}>{t('Sign in')}</button>
					<LoginGoogle setErr={setErr} />
					<div className="signup_link">
						{t('Forgot password?')} <Link to='/restore-password'>{t('Restore')}</Link>
					</div>
					<div className="signup_link">
						{t('Have not an Account?')} <Link to='/signup'>{t('Register Here')}</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;