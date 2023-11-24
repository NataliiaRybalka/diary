import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView, RefreshControl } from 'react-native';

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
	const [showPicker, setShowPicker] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	useFocusEffect(
		useCallback(() => {
			const yearMonth = getMonth(new Date());
			setMonth(yearMonth);
			getMonthResult();
		}, [])
	);

	useFocusEffect(
		useCallback(() => {
			getMonthResult();
		}, [month])
	);

	const getMonthResult = async () => {
		const user = await AsyncStorage.getItem('user');
		const res = await fetch(`${SERVER}/diary/result/${JSON.parse(user).id}/${month}`);

		const data = await res.json();
		setTableData(data);
	};

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	return (
		<ScrollView
			style={[styles.container, {backgroundColor: bgColour}, showPicker && {backgroundColor: 'rgba(0, 0, 0, 0.7)'}]}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
		>
			<MonthPicker month={month} setMonth={setMonth} showPicker={showPicker} setShowPicker={setShowPicker} />

			<View style={styles.table}>
				<View style={styles.rowTable}>
					{fieldsList.map((field, index) => (
						<Text style={styles.cellHeader} key={`${uuid.v4()}${index}`}>{t(field)}</Text>
					))}
				</View>
				
				{tableData.length 
					? tableData.map((row, rowI) => (
						<View style={styles.rowTable} key={rowI}>
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