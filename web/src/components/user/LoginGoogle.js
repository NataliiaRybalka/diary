import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import { SERVER } from '../../lib/constants';

import './Registration.css';

function LoginGoogle({setErr}) {
	const onSuccess = async (response) => {
		const userData = jwt_decode(response.credential);
		await sendUserData(userData);
	};

	const onError = (response) => setErr(response);

	const sendUserData = async(userData) => {
		const resp = await fetch(`${SERVER}/signin-google`, {
			method: 'POST',
			body: JSON.stringify({
				username: userData.name,
				email: userData.email,
			}),
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
				sex: data.user.sex,
			}));
			localStorage.setItem('lang', data.user.language);
			setErr(null);
			window.location.reload();
		}
	};

	return (
		<>
			<GoogleLogin onSuccess={onSuccess} onError={onError} logo_alignment='center' />
		</>
	);
}

export default LoginGoogle;