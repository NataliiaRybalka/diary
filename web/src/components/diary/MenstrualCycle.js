import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import DayPicker from '../pages/DayPicker';
import Menu from './Menu';
import MonthPicker from '../pages/MonthPicker';
import { SERVER } from '../../lib/constants';

import './MenstrualCycle.css';

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
	const [tableData, setTableData] = useState([{
		'month': '',
		'startDate': '',
		'endDate': '',
		'durationCycle': '',
		'startOvulation': '',
		'notes': '',
	}]);
	const [rows, setRows] = useState(1);
	const [updatedRow, setUpdatedRow] = useState();
	const [showMonthPicker, setShowMonthPicker] = useState(false);
	const [month, setMonth] = useState('');
	const [showStartDatePicker, setShowStartDatePicker] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [showEndDatePicker, setShowEndDatePicker] = useState(false);
	const [endDate, setEndDate] = useState('');
	const [showStartOvulationDatePicker, setShowStartOvulationDatePicker] = useState(false);
	const [startOvulation, setStartOvulation] = useState('');

	useEffect(() => {
		getMenstrualCycleTable();
	}, []);

	useEffect(() => {
		if (month) {
			const newTableData = tableData;
			newTableData[updatedRow].month = month;
	
			setTableData(newTableData);
		}
	}, [month]);
	useEffect(() => {
		if (startDate) {
			const newTableData = tableData;
			newTableData[updatedRow].startDate = startDate;
	
			setTableData(newTableData);
		}
	}, [startDate]);
	useEffect(() => {
		if (endDate) {
			const newTableData = tableData;
			newTableData[updatedRow].endDate = endDate;
	
			setTableData(newTableData);
		}
	}, [endDate]);
	useEffect(() => {
		if (startOvulation) {
			const newTableData = tableData;
			newTableData[updatedRow].startOvulation = startOvulation;
	
			setTableData(newTableData);
		}
	}, [startOvulation]);

	const getMenstrualCycleTable = async () => {
		const res = await fetch(`${SERVER}/diary/menstrual-cycle/${JSON.parse(localStorage.getItem('user')).id}`);
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
		const data = tableData[updatedRow];
		const endpoint = data._id ? `${data._id}` : `${JSON.parse(localStorage.getItem('user')).id}`;
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
		<div>
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
							<td className='pickerTd'>
								{showMonthPicker 
									? updatedRow === String(rowI) 
										&& <MonthPicker month={month} setMonth={setMonth} setShowPicker={setShowMonthPicker} />
									: <div onClick={() => {
										setUpdatedRow(String(rowI));
										setShowMonthPicker(!showMonthPicker)
									}}
									className='monthInput'>
										{(updatedRow === String(rowI) && month.length) ? month : tableData[rowI].month}
									</div>
								}
							</td>
							<td className='pickerTd'>
								{showStartDatePicker
									? updatedRow === String(rowI) 
										&& <DayPicker day={startDate} setDay={setStartDate} setShowPicker={setShowStartDatePicker} />
									: <div onClick={() => {
										setUpdatedRow(String(rowI));
										setShowStartDatePicker(!showStartDatePicker)
									}}
									className='monthInput'>
										{(updatedRow === String(rowI) && startDate.length) 
											? startDate 
											: tableData[rowI].startDate
										}
									</div>
								}
							</td>
							<td className='mcTableBodyTd pickerTd'>
								{showEndDatePicker
									? updatedRow === String(rowI) 
										&& <DayPicker day={endDate} setDay={setEndDate} setShowPicker={setShowEndDatePicker} />
									: <div onClick={() => {
										setUpdatedRow(String(rowI));
										setShowEndDatePicker(!showEndDatePicker)
									}}
									className='monthInput'>
										{(updatedRow === String(rowI) && endDate.length) 
											? endDate 
											: tableData[rowI].endDate
										}
									</div>
								}
							</td>
							<td className='mcTableBodyTdNumber'>
								<input type='number' name='durationCycle' value={tableData[rowI]?.durationCycle} onChange={e => onChangeInput(e, rowI)} />
							</td>
							<td className='pickerTd'>
								{showStartOvulationDatePicker
									? updatedRow === String(rowI) 
										&& <DayPicker day={startOvulation} setDay={setStartOvulation} setShowPicker={setShowStartOvulationDatePicker} />
									: <div onClick={() => {
										setUpdatedRow(String(rowI));
										setShowStartOvulationDatePicker(!showStartOvulationDatePicker)
									}}
									className='monthInput'>
										{(updatedRow === String(rowI) && startOvulation.length) 
											? startOvulation 
											: tableData[rowI].startOvulation
										}
									</div>
								}
							</td>
							<td className='notes'>
								<textarea type='text' name='notes' value={tableData[rowI]?.notes} onChange={e => onChangeInput(e, rowI)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<button className='submit savePage' onClick={onHandleSave}>{t('Save')}</button>
		</div>
	);
};

export default MenstrualCycle;