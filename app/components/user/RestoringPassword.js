import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

import { SERVER } from '../../lib/constants';

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
		<View>
			<Text>restorePassword</Text>
				{/* <div className='form'>
					<div className="txt_field">
						<input type="email" name="email" required onChange={e => setEmail(e.target.value)} />
						<span></span>
						<label>{t('Email')}</label>
					</div>
					{err && <p className='pError'>{err}</p>}
					<button className='submit restoreSubmit' onClick={restorePassword}>{t('Restore')}</button>
				</div> */}
		</View>
	);
}

export default RestoringPassword;