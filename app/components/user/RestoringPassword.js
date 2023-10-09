import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput } from 'react-native';

import { SERVER } from '../../lib/constants';

import { styles } from './styles';

function RestoringPassword() {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);

	const [email, setEmail] = useState('');
	const [err, setErr] = useState(null);

	const restorePassword = async() => {
		const resp = await fetch(`${SERVER}/forgot-password/${email}`);

		const data = await resp.json();
		setErr(JSON.stringify(data));
	};

	return (
		<View style={[styles.containerRestore, { backgroundColor: bgColour }]}>
			<TextInput
				textContentType='emailAddress'
				keyboardType='email-address'
				style={styles.input} 
				placeholder={t('Email')}
				value={email.toString()}
				onChangeText={text => setEmail(text)}
			/>
			{err && <Text style={styles.err}>{err}</Text>}
			<View style={styles.btn}>
				<Text style={styles.btnText} onPress={restorePassword}>{t('Restore')}</Text>
			</View>
		</View>
	);
}

export default RestoringPassword;