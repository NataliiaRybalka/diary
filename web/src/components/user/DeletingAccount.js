import { useState } from 'react';

import { SERVER } from '../../lib/constants';

function DeletingAccount({user}) {
	const [check, setCheck] = useState();
	const [err, setErr] = useState(null);

	const deleteAccount = async() => {
		const resp = await fetch(`${SERVER}/user/${user?.id}`, {
			method: 'DELETE',
			body: JSON.stringify({
				username: user?.username,
				email: user?.email,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (resp.status !== 204) setErr('Something went wrong');
		else {
			localStorage.removeItem('user');
			setErr(null);
		}
	};

	return (
		<div className="center">
			<h2>Delete Account</h2>
			<div className='form'>
				<div className='checkboxDelete'>
					<label>Are you sure?</label> 
					<input type='checkbox' name='deleteAccount' value={check} onChange={({target: {checked}}) => setCheck(checked)} />
				</div>
				{err && <p className='pError'>{err}</p>}
				<button className='submit restoreSubmit' onClick={deleteAccount}>Delete</button>
			</div>
		</div>
	);
}

export default DeletingAccount;