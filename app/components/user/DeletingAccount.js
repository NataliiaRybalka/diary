import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

import { changeUser } from '../../redux/user.slice';
import { SERVER } from '../../lib/constants';

import { styles } from './styles';

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
		const resp = await fetch(`${SERVER}/user/${user._id}`, {
			method: 'DELETE',
			body: JSON.stringify({
				username: user.username,
				email: user.email,
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
		<View style={[styles.containerRestore, { backgroundColor: bgColour }]}>
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

export default DeletingAccount;