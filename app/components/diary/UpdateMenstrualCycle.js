import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { View, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DayPicker from '../pages/DayPicker';
import MonthPicker from '../pages/MonthPicker';
import { SERVER } from '../../lib/constants';

import { styles } from './styles';

function UpdateMenstrualCycle({ navigation, route }) {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);
	const { row } = route.params;

	const [durationCycle, setDurationCycle] = useState(row.durationCycle);
	const [endDate, setEndDate] = useState(row.endDate);
	const [month, setMonth] = useState(row.month);
	const [startDate, setStartDate] = useState(row.startDate);
	const [startOvulation, setStartOvulation] = useState(row.startOvulation);
	const [notes, setNotes] = useState(row.notes);
	const [saved, setSaved] = useState(false);

	const onHandleSave = async () => {
		const user = await AsyncStorage.getItem('user');
		const data = {
			_id: row._id,
			durationCycle,
			endDate,
			month,
			startDate,
			startOvulation,
			notes,
		};
		const endpoint = data._id ? `${data._id}` : `${JSON.parse(user).id}`;
		const method = data._id ? 'PUT' : 'POST';

		const resp = await fetch(`${SERVER}/diary/menstrual-cycle/${endpoint}`, {
			method,
			body: JSON.stringify({
				tableData: data,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (resp.status === 201) setSaved(true);
		navigation.navigate('Root');
	};

	return (
		<View style={[styles.container, styles.containerUpdate, { backgroundColor: bgColour }]}>
			<View style={styles.rowUpdate}>
				<Text style={styles.text}>{t('Month')}: </Text>
				<MonthPicker month={month} setMonth={setMonth} />
			</View>

			<View style={styles.rowUpdate}>
				<Text style={styles.text}>{t('Start Date')}: </Text>
				<DayPicker day={startDate} setDay={setStartDate} />
			</View>

			<View style={styles.rowUpdate}>
				<Text style={styles.text}>{t('End Date')}: </Text>
				<DayPicker day={endDate} setDay={setEndDate} />
			</View>

			<View style={styles.rowUpdate}>
				<Text style={styles.text}>{t('Duration of Cycle')}: </Text>
				<TextInput
					style={styles.data}
					onChangeText={text => setDurationCycle(text)}
					value={durationCycle}
				/>
			</View>

			<View style={styles.rowUpdate}>
				<Text style={styles.text}>{t('Start Ovulation')}: </Text>
				<DayPicker day={startOvulation} setDay={setStartOvulation} />
			</View>

			<View>
				<Text style={styles.text}>{t('Notes')}: </Text>
				<TextInput
					style={styles.notes}
					onChangeText={text => setNotes(text)}
					value={notes}
				/>
			</View>

			<View style={styles.btn}>
				<Text style={styles.btnText} onPress={onHandleSave}>{t('Save')}</Text>
			</View>

			{saved && <Text style={styles.result}>{t('Saved successfully')}</Text>}
		</View>
	);
};

export default UpdateMenstrualCycle;