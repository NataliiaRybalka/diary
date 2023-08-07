import { useState } from 'react';
import { Link } from 'react-router-dom';

import { SERVER } from '../../lib/constants';

import './Registration.css';

function Login() {
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

	const sendUserData = async () => {
		const resp = await fetch(`${SERVER}/signin`, {
			method: 'POST',
			body: JSON.stringify(userData),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await resp.json()
		if (resp.status !== 200) setErr(JSON.stringify(data));
		else setErr(null)
	};

	return (
		<div className="container">
			<div className="center">
				<h1>Login</h1>
				<div className='form'>
					<div className="txt_field">
						<input type="email" name="email" required onChange={e => onChangeUserData(e)} />
						<span></span>
						<label>Email</label>
					</div>
					<div className="txt_field">
						<input type="password" name="password" required onChange={e => onChangeUserData(e)} />
						<span></span>
						<label>Password</label>
					</div>
					{err && <p className='pError'>{err}</p>}
					<button className='submit' onClick={sendUserData}>Sign In</button>
					<div className="signup_link">
						Have not an Account ? <Link to='/signup'>Register Here</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;