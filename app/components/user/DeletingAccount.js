import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { View, Text, CheckBox, StyleSheet } from 'react-native';

import { SERVER } from '../../lib/constants';

function DeletingAccount({user}) {
	const { t } = useTranslation();
	const language = useSelector(state => state.language.value);

	const [check, setCheck] = useState(false);
	const [err, setErr] = useState(null);

	const deleteAccount = async() => {
		const resp = await fetch(`${SERVER}/user/${user?.id}`, {
			method: 'DELETE',
			body: JSON.stringify({
				username: user?.username,
				email: user?.email,
				language,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (resp.status !== 204) setErr('Something went wrong');
		else {
			localStorage.removeItem('user');
			setErr(null);
			window.location = '/signin';
		}
	};

	return (
		<View style={[styles.container, { backgroundColor: bgColour }]}>
			<Text style={styles.label}>Are you sure?</Text>
			<CheckBox
				value={check}
				onValueChange={setCheck}
				style={styles.checkbox}
			/>
			{err && <Text style={styles.err}>{err}</Text>}
			<View style={styles.btn}>
				<Text style={styles.btnText} onPress={deleteAccount}>{t('Delete')}</Text>
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

export default DeletingAccount;