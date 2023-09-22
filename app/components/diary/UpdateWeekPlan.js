import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TimePicker from './TimePicker';
import { SERVER } from '../../lib/constants';

function UpdateWeekPlan({ navigation, route }) {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);

	const { date, engDate, dayPlan } = route.params;

	const [updatedDay, setUpdatedDay] = useState(dayPlan);
	const [rows, setRows] = useState(dayPlan?.plans?.length || 0);
	const [saved, setSaved] = useState(false);

	const handleAddRow = () => {
		setRows(rows + 1);

		if (updatedDay) {
			return setUpdatedDay(prev => ({
				...prev,
				plans: [
					...updatedDay?.plans,
					{
						time: '00:00',
						plan: '',
					}
				],
			}));
		}

		setUpdatedDay({
			date: engDate,
			plans: [
				{
					time: '00:00',
					plan: '',
				}
			],
		});
	};
	const handleRemoveRow = () => {
		if (rows > 0) {
			setRows(rows - 1);
		}
	};

	const onChangeInput = (text, rowNumber, field) => {
		const updatedPlans = [...updatedDay.plans];
		updatedPlans[rowNumber] = {
			...updatedPlans[rowNumber],
			[field]: text,
		};
		setUpdatedDay(prev => ({
			...prev,
			plans: updatedPlans,
		}));
	};

	const saveWeekPlan = async () => {
		console.log(updatedDay);
		// const user = await AsyncStorage.getItem('user');
		// const endpoint = updatedDay ? `/week-plan/${updatedDay._id}` : `/day-plan/${JSON.parse(user).id}`;
		// const method = updatedDay ? 'PUT' : 'POST';
		// const body = updatedDay 
		// 	? {
		// 		plans: updatedDay.plans,
		// 		timezone: new Date().getTimezoneOffset()/60,
		// 		user: user,
		// 		language: lang,
		// 	}
		// 	: {
		// 		date: day,
		// 		plans: Object.values(weekPlan[day]),
		// 		timezone: new Date().getTimezoneOffset()/60,
		// 		language: lang,
		// 	}

		// const res = await fetch(`${SERVER}/diary${endpoint}`, {
		// 	method,
		// 	body: JSON.stringify(body),
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// });

		// const data = await res.json();
		// setWeekPlan(prev => ({
		// 	...prev,
		// 	[data.date]: data
		// }));
	};

	return (
		<View style={[styles.container, { backgroundColor: bgColour }]}>
			<Text style={styles.date}>{date}</Text>

			<View style={styles.rowBtn}>
				<Text style={styles.newRow} onPress={handleAddRow}>+</Text>
				<Text style={styles.newRow} onPress={handleRemoveRow}>-</Text>
			</View>

			{[...Array(rows)].map((row, rowNumber) => (
				<View style={styles.row} key={rowNumber}>
					<TimePicker time={updatedDay.plans[rowNumber]?.time} />
					<TextInput
						style={styles.input}
						value={updatedDay.plans[rowNumber]?.plan}
						onChangeText={text => onChangeInput(text, rowNumber, 'plan')}
					/>
				</View>
			))}

			<View style={styles.btn}>
				<Text style={styles.btnText} onPress={saveWeekPlan}>{t('Save')}</Text>
			</View>

			{saved && <Text style={styles.result}>{t('Saved successfully')}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		minHeight: '100%',
		paddingTop: 50,
		paddingHorizontal: 10
	},
	date: {
		textAlign: 'center',
		fontSize: 18,
		fontWeight: '500'
	},
	rowBtn: {
		flexDirection: 'row',
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	newRow: {
		borderWidth: 1,
		marginHorizontal: 20,
		fontSize: 20,
		width: 30,
		textAlign: 'center',
	},
	row: {
		flexDirection: 'row',
		marginVertical: 10,
		alignItems: 'center',
	},
	input: {
		borderWidth: 1,
		color: '#000000',
		textAlign: 'center',
		width: '65%',
		height: 30,
		lineHeight: 30
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
	result: {
		textAlign: 'center',
		marginTop: 10,
		color: 'green'
	}
});

export default UpdateWeekPlan;