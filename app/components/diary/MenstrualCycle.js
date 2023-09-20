import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getMonth } from '../../lib/getDates';
import MonthPicker from './MonthPicker';
import { SERVER } from '../../lib/constants';

function MenstrualCycle() {
	const { t } = useTranslation();

	const bgColour = useSelector(state => state.bgColour.value);
	const fieldsList = [
		'Month',
		'Start Date',
		'End Date',
		'Duration of Cycle',
		'Start Ovulation',
		'Notes',
	];
	const [tableData, setTableData] = useState([]);
	const [rows, setRows] = useState(1);
	const [updatedRow, setUpdatedRow] = useState();

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

	const onChangeInput = (e, rowI) => {
		const newState = tableData.map((tableRow, ind) => {
			if (ind === rowI) {
				return {...tableRow, [e.target.name]: e.target.value};
			}

			return tableRow;
		});

		setTableData(newState);
		setUpdatedRow(rowI);
	};

	const onHandleSave = async () => {
		const user = await AsyncStorage.getItem('user');
		const data = tableData[updatedRow];
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
	};

	return (
		<ScrollView style={[styles.container, {backgroundColor: bgColour}]}>
			<Text style={styles.newMonth} onPress={handleAddRow}>{t('Add new month')}</Text>

			{tableData.length && tableData.map((row, rowI) => (
				<MonthPicker month={row.month} setMonth={onChangeInput}/>
			))}
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
		height: 30
	}
});

export default MenstrualCycle;

{/* <div>
			<h1>{t('Menstrual Cycle')}</h1>
			<Menu />

			<button className='addRemoveRowTable' style={{ backgroundColor: bgColour }} onClick={handleAddRow}>{t('Add new month')}</button>
			<table className='menstrualCycleTable'>
				<thead>
					<tr>{fieldsList.map(field => <th key={field}>{t(field)}</th>)}</tr>
				</thead>

				<tbody>
					{[...Array(rows)].map((row, rowI) => (
						<tr key={rowI}>
							<td className='mcTableBodyTd'>
								<input type='month' name='month' value={tableData[rowI]?.month} onChange={e => onChangeInput(e, rowI)} />
							</td>
							<td className='mcTableBodyTd'>
								<input type='date' name='startDate' value={tableData[rowI]?.startDate} onChange={e => onChangeInput(e, rowI)} />
							</td>
							<td className='mcTableBodyTd'>
								<input type='date' name='endDate' value={tableData[rowI]?.endDate} onChange={e => onChangeInput(e, rowI)} />
							</td>
							<td className='mcTableBodyTd mcTableBodyTdNumber'>
								<input type='number' name='durationCycle' value={tableData[rowI]?.durationCycle} onChange={e => onChangeInput(e, rowI)} />
							</td>
							<td className='mcTableBodyTd'>
								<input type='date' name='startOvulation' value={tableData[rowI]?.startOvulation} onChange={e => onChangeInput(e, rowI)} />
							</td>
							<td className='mcTableBodyTd notes'>
								<textarea type='text' name='notes' value={tableData[rowI]?.notes} onChange={e => onChangeInput(e, rowI)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<button className='submit savePage' onClick={onHandleSave}>{t('Save')}</button>
		</div> */}