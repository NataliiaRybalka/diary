import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DayPicker from './DayPicker';
import MonthPicker from './MonthPicker';
import { SERVER } from '../../lib/constants';

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

		await fetch(`${SERVER}/diary/menstrual-cycle/${endpoint}`, {
			method,
			body: JSON.stringify({
				tableData: data,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		navigation.navigate('Root');
	};

	return (
		<View style={[styles.container, { backgroundColor: bgColour }]}>
			<View style={styles.row}>
				<Text style={styles.text}>{t('Month')}: </Text>
				<MonthPicker month={month} setMonth={setMonth} />
			</View>

			<View style={styles.row}>
				<Text style={styles.text}>{t('Start Date')}: </Text>
				<DayPicker day={startDate} setDay={setStartDate} />
			</View>

			<View style={styles.row}>
				<Text style={styles.text}>{t('End Date')}: </Text>
				<DayPicker day={endDate} setDay={setEndDate} />
			</View>

			<View style={styles.row}>
				<Text style={styles.text}>{t('Duration of Cycle')}: </Text>
				<TextInput
					style={styles.data}
					onChangeText={text => setDurationCycle(text)}
					value={durationCycle}
				/>
			</View>

			<View style={styles.row}>
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		minHeight: '100%',
		paddingTop: 50,
		paddingHorizontal: 10
	},
	row: {
		flexDirection: 'row',
		marginVertical: 10,
		alignItems: 'center'
	},
	text: {
		minWidth: 170,
		fontSize: 16,
		fontWeight: '500'
	},
	data: {
		borderWidth: 1,
		color: '#000000',
		marginHorizontal: 10,
		textAlign: 'center',
		width: 100,
		height: 30,
		lineHeight: 30
	},
	notes: {
		marginTop: 10,
		borderWidth: 1,
		width: '100%',
		height: 30,
		height: 40,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
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
});

export default UpdateMenstrualCycle;