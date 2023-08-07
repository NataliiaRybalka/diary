import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { SERVER } from '../../lib/constants';

import './Registration.css';

function ChangingPassword() {
	const location = useLocation();
	const [password, setPassword] = useState(null);
	const [err, setErr] = useState(null);

	const restorePassword = async() => {
		const resp = await fetch(`${SERVER}${location.pathname}`, {
			method: 'PATCH',
			body: JSON.stringify({password}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await resp.json();
		setErr(JSON.stringify(data));
	};

	return (
		<div className="container">
			<div className="center">
				<h1>Set New Password</h1>
				<div className='form'>
					<div className="txt_field">
						<input type="text" name="password" required onChange={e => setPassword(e.target.value)} />
						<span></span>
						<label>New Password</label>
					</div>
					{err && <p className='pError'>{err}</p>}
					<button className='submit restoreSubmit' onClick={restorePassword}>Restore</button>
				</div>
			</div>
		</div>
	);
}

export default ChangingPassword;