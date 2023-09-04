import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SERVER } from '../../lib/constants';

import './User.css';

function RestoringPassword() {
	const { t } = useTranslation();

	const [email, setEmail] = useState('');
	const [err, setErr] = useState(null);

	const restorePassword = async() => {
		const resp = await fetch(`${SERVER}/forgot-password/${email}`);

		const data = await resp.json();
		setErr(JSON.stringify(data));
	};

	return (
		<div className="container">
			<div className="center">
				<h1>{t('Restore Password')}</h1>
				<div className='form'>
					<div className="txt_field">
						<input type="email" name="email" required onChange={e => setEmail(e.target.value)} />
						<span></span>
						<label>{t('Email')}</label>
					</div>
					{err && <p className='pError'>{err}</p>}
					<button className='submit restoreSubmit' onClick={restorePassword}>{t('Restore')}</button>
				</div>
			</div>
		</div>
	);
}

export default RestoringPassword;