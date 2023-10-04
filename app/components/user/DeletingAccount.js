import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { changeUser } from '../../redux/user.slice';
import { SERVER } from '../../lib/constants';

function DeletingAccount({ navigation }) {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);
	const language = useSelector(state => state.language.value);
	const user = useSelector(state => state.user.value);
	const dispatch = useDispatch();

	const [check, setCheck] = useState(false);
	const [err, setErr] = useState(null);

	const deleteAccount = async() => {
		if (!check) return;
		const resp = await fetch(`${SERVER}/user/${user?._id}`, {
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
			dispatch(changeUser(null));
			await AsyncStorage.removeItem('user');
			setErr(null);
			navigation.navigate('Root');
		}
	};

	return (
		<View style={[styles.container, { backgroundColor: bgColour }]}>
			<View style={styles.checkboxContainer}>
				<Text style={styles.label}>{t('Are you sure?')}</Text>
				<Checkbox
					value={check}
					onValueChange={setCheck}
					style={styles.checkbox}
				/>
			</View>
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
	},
	label: {
		fontSize: 16
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
	},
	checkboxContainer: {
		justifyContent: 'center',
		flexDirection: 'row'
	},
	checkbox: {
		marginLeft: 10
	},
});

export default DeletingAccount;