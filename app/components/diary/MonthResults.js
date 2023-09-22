import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { getMonth } from '../../lib/getDates';
import MonthPicker from './MonthPicker';
import { SERVER } from '../../lib/constants';

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
				<View style={styles.row}>
					{fieldsList.map((field, index) => (
						<Text style={styles.cellHeader} key={`${uuid.v4()}${index}`}>{t(field)}</Text>
					))}
				</View>
				
				{tableData.length 
					? tableData.map((row, rowI) => (
						<View style={styles.row}>
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

const styles = StyleSheet.create({
	container: {
		minHeight: '100%',
	},
	table: {
		borderWidth: 1,
		borderColor: '#000000',
		marginTop: 10,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cellHeader: {
		flex: 1,
		borderWidth: 1,
		height: 50,
		textAlign: 'center',
		fontSize: 12,
		fontWeight: '500',
		borderColor: '#000000',
	},
	cell: {
		flex: 1,
		padding: 10,
		borderWidth: 1,
		height: 50,
		textAlign: 'center',
		fontSize: 12,
		borderColor: '#000000',
	},
});

export default MonthResults;