import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { SERVER } from '../../lib/constants';

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
		<View style={[styles.container, { backgroundColor: bgColour }]}>
			<TextInput
				textContentType='emailAddress'
				keyboardType='email-address'
				style={styles.input} 
				placeholder='Email'
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		textAlign: 'center',
		fontSize: 16,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
	},
	err: {
		color: '#ff0000',
		textAlign: 'center',
	},
	btn: {
		height: 40,
		borderRadius: 25,
		borderColor: '#000000',
		borderStyle: 'solid',
		borderWidth: 1,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: '50%',
		marginTop: 10,
		marginLeft: '25%'
	},
	btnText: {
		fontSize: 18,
		fontWeight: '700',
	}
});

export default RestoringPassword;