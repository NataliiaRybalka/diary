import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView } from 'react-native';

import { getMonth } from '../../lib/getDates';
import MonthPicker from '../pages/MonthPicker';
import { SERVER } from '../../lib/constants';

import { styles } from './styles';

function MonthResults() {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);

	const fieldsList = [
		'Date',
		'Day of the menstrual cycle',
		'Sleep (h)',
		'Physical activity',
		'Drank some water'
	];
	const [tableData, setTableData] = useState([]);
	const [month, setMonth] = useState('');

	useEffect(() => {
		const yearMonth = getMonth(new Date());
		setMonth(yearMonth);
		getMonthResult();
	}, []);

	useEffect(() => {
		getMonthResult();
	}, [month]);

	const getMonthResult = async () => {
		const user = await AsyncStorage.getItem('user');
		const res = await fetch(`${SERVER}/diary/result/${JSON.parse(user).id}/${month}`);

		const data = await res.json();
		setTableData(data);
	};

	return (
		<ScrollView style={[styles.container, {backgroundColor: bgColour}]}>
			<MonthPicker month={month} setMonth={setMonth} />

			<View style={styles.table}>
				<View style={styles.rowTable}>
					{fieldsList.map((field, index) => (
						<Text style={styles.cellHeader} key={`${uuid.v4()}${index}`}>{t(field)}</Text>
					))}
				</View>
				
				{tableData.length 
					? tableData.map((row, rowI) => (
						<View style={styles.rowTable}>
							<Text style={styles.cell} key={`${uuid.v4()}${rowI}`}>{tableData[rowI].date}</Text>
							<Text style={styles.cell} key={`${uuid.v4()}${rowI}`}>{tableData[rowI].menstrualDay}</Text>
							<Text style={styles.cell} key={`${uuid.v4()}${rowI}`}>{tableData[rowI].totalHours}</Text>
							<Text style={styles.cell} key={`${uuid.v4()}${rowI}`}>{tableData[rowI].physicalActivity}</Text>
							<Text style={styles.cell} key={`${uuid.v4()}${rowI}`}>{tableData[rowI].drankWater}</Text>
						</View>
					))
					: <></>
				}
			</View>
		</ScrollView>
	);
};

export default MonthResults;