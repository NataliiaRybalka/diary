import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { SERVER } from '../../lib/constants';

function User({user}) {
	const { t } = useTranslation();

	const [userData, setUserData] = useState({
		username: user?.username || '',
		email: user?.email || '',
		password: '',
		language: user?.language,
	});
	const [err, setErr] = useState(null);

	const onChangeUserData = (e) => {
		setUserData(prev => ({
			...prev,
			...{[e.target.name]: e.target.value}
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
			localStorage.setItem('user', JSON.stringify({
				username: userData.username,
				language: userData.language,
				email: user?.email,
				id: user?.id,
			}));
			setErr(null);
		}
	};

	return (
		<div className="center">
			<h1>{user && user.username}</h1>
			<div className='form'>
				<div className="txt_field">
					<input type="text" name="username" value={userData.username} onChange={e => onChangeUserData(e)} />
					<span></span>
					<label>{t('Username')}</label>
				</div>
				<div className="txt_field">
					<input type="email" name="email" readOnly='readonly' value={userData.email} />
					<span></span>
					<label>{t('Email')}</label>
				</div>
				<div className="txt_field">
					<input type="password" name="password" value={userData.password} onChange={e => onChangeUserData(e)} />
					<span></span>
					<label>{t('Password')}</label>
				</div>
				{err && <p className='pError'>{err}</p>}
				<button className='submit' onClick={updateUserData}>{t('Update')}</button>
				<div className="signup_link">
					<Link to='/delete-account'>{t('Delete Account')}</Link>
				</div>
			</div>
		</div>
	);
}

export default User;