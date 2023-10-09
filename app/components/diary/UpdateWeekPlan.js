import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { View, Text, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TimePicker from '../pages/TimePicker';
import { SERVER } from '../../lib/constants';

import { styles } from './styles';

function UpdateWeekPlan({ route }) {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);

	const { date, engDate, dayPlan, lang } = route.params;

	const [updatedDay, setUpdatedDay] = useState(dayPlan);
	const [rows, setRows] = useState(dayPlan?.plans?.length || 0);
	const [saved, setSaved] = useState(false);
	const [time, setTime] = useState();
	const [rowInFocus, setRowInFocus] = useState(null);

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

			const updatedPlans = [...updatedDay.plans];
			updatedPlans.pop();
			setUpdatedDay(prev => ({
				...prev,
				plans: updatedPlans,
			}));
		}
	};

	const onChangeInput = (text, rowNumber) => {
		const updatedPlans = [...updatedDay.plans];
		updatedPlans[rowNumber] = {
			...updatedPlans[rowNumber],
			plan: text,
		};
		setUpdatedDay(prev => ({
			...prev,
			plans: updatedPlans,
		}));
	};

	useEffect(() => {
		if (!updatedDay?.plans) return;
		const updatedPlans = [...updatedDay.plans];
		updatedPlans[rowInFocus] = {
			...updatedPlans[rowInFocus],
			time,
		};
		setUpdatedDay(prev => ({
			...prev,
			plans: updatedPlans,
		}));
	}, [time]);

	const saveWeekPlan = async () => {
		const user = await AsyncStorage.getItem('user');
		const endpoint = updatedDay._id ? `/week-plan/${updatedDay._id}` : `/day-plan/${JSON.parse(user).id}`;
		const method = updatedDay._id ? 'PUT' : 'POST';
		const body = updatedDay._id 
			? {
				plans: updatedDay.plans,
				timezone: new Date().getTimezoneOffset()/60,
				user: user,
				language: lang,
			}
			: {
				date: engDate,
				plans: Object.values(updatedDay.plans),
				timezone: new Date().getTimezoneOffset()/60,
				language: lang,
			}

		const resp = await fetch(`${SERVER}/diary${endpoint}`, {
			method,
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (resp.status === 201) {
			const data = await resp.json();
			setUpdatedDay(data);
			setSaved(true);
		}
	};

	return (
		<ScrollView style={[styles.container, styles.containerUpdate, { backgroundColor: bgColour }]}>
			<Text style={styles.date}>{date}</Text>

			<View style={styles.rowBtn}>
				<Text style={styles.newRow} onPress={handleAddRow}>+</Text>
				<Text style={styles.newRow} onPress={handleRemoveRow}>-</Text>
			</View>

			{[...Array(rows)].map((row, rowNumber) => (
				<View style={styles.rowUpdate} key={rowNumber}>
					<TimePicker time={updatedDay.plans[rowNumber]?.time} setTime={setTime} row={rowNumber} setRowInFocus={setRowInFocus} />
					<TextInput
						style={styles.input}
						value={updatedDay.plans[rowNumber]?.plan}
						onChangeText={text => onChangeInput(text, rowNumber)}
					/>
				</View>
			))}

			<View style={styles.btn}>
				<Text style={styles.btnText} onPress={saveWeekPlan}>{t('Save')}</Text>
			</View>

			{saved && <Text style={styles.result}>{t('Saved successfully')}</Text>}
		</ScrollView>
	);
};

export default UpdateWeekPlan;