import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SERVER } from '../../lib/constants';

function MenstrualCycle({navigation}) {
	const { t } = useTranslation();

	const bgColour = useSelector(state => state.bgColour.value);
	const [tableData, setTableData] = useState([]);
	const [rows, setRows] = useState(1);

	useEffect(() => {
		getMenstrualCycleTable();
	}, []);

	const getMenstrualCycleTable = async () => {
		const user = await AsyncStorage.getItem('user');
		const res = await fetch(`${SERVER}/diary/menstrual-cycle/${JSON.parse(user).id}`);
		const data = await res.json();
		setTableData(data);
		setRows(data.length);
	};

	const handleAddRow = () => {
		setTableData([{
			'month': '',
			'startDate': '',
			'endDate': '',
			'durationCycle': '',
			'startOvulation': '',
			'notes': '',
		}, ...tableData]);
		setRows(rows + 1);
	}

	return (
		<ScrollView style={[styles.container, {backgroundColor: bgColour}]}>
			<Text style={styles.newMonth} onPress={handleAddRow}>{t('Add new month')}</Text>

			{tableData.length 
				? tableData.map((row, rowI) => (
					<Text
						key={rowI}
						style={styles.row}
						onPress={() => navigation.navigate('Update Menstrual Cycle', { row })}
					>
						{row.month}
					</Text>
				))
				: <></>
			}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		minHeight: '100%',
	},
	newMonth: {
		borderWidth: 1.5,
		width: 200,
		textAlign: 'center',
		marginHorizontal: 10,
		fontSize: 16,
		marginBottom: 10
	},
	row: {
		borderWidth: 1,
		fontSize: 16,
		paddingHorizontal: 10,
		lineHeight: 30,
		height: 30,
		marginVertical: 5,
	}
});

export default MenstrualCycle;