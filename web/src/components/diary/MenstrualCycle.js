import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Menu from './Menu';
import { SERVER } from '../../lib/constants';

import './MenstrualCycle.css';

function MenstrualCycle() {
	const { t } = useTranslation();

	const fieldsList = [
		'Month',
		'Start Date',
		'End Date',
		'Duration of Menstruation',
		'Duration of Cycle',
		'Start Ovulation',
		'Emotional State Notes',
		'Notes',
	];
	const [tableData, setTableData] = useState({
		'month': '',
		'startDate': '',
		'endDate': '',
		'durationMenstruation': '',
		'durationCycle': '',
		'startOvulation': '',
		'emotionalNotes': '',
		'notes': '',
	});
	const [rows, setRows] = useState(1);

	const handleAddRow = () => setRows(rows + 1);

	const onChangeInput = (e) => {
		setTableData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	};

	const onHandleSave = async () => {
		await fetch(`${SERVER}/diary/menstrual-cycle/${JSON.parse(localStorage.getItem('user')).id}`, {
			method: 'POST',
			body: JSON.stringify({
				tableData,
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

			<button className='addRemoveRow addRemoveRowTable' onClick={handleAddRow}>+</button>
			<table className='menstrualCycleTable'>
				<thead>
					<tr>{fieldsList.map(field => <th key={field}>{t(field)}</th>)}</tr>
				</thead>

				<tbody>
					{[...Array(rows)].map((row, rowI) => (
						<tr key={rowI} className='menstrualCycleTableBodyTr'>
							<td className='mcTableBodyTd'>
								<input type='month' name='month' value={tableData.month} onChange={e => onChangeInput(e)} />
							</td>
							<td className='mcTableBodyTd'>
								<input type='date' name='startDate' value={tableData.startDate} onChange={e => onChangeInput(e)} />
							</td>
							<td className='mcTableBodyTd'>
								<input type='date' name='endDate' value={tableData.endDate} onChange={e => onChangeInput(e)} />
							</td>
							<td className='mcTableBodyTd mcTableBodyTdNumber'>
								<input type='number' name='durationMenstruation' value={tableData.durationMenstruation} onChange={e => onChangeInput(e)} />
							</td>
							<td className='mcTableBodyTd mcTableBodyTdNumber'>
								<input type='number' name='durationCycle' value={tableData.durationCycle} onChange={e => onChangeInput(e)} />
							</td>
							<td className='mcTableBodyTd'>
								<input type='date' name='startOvulation' value={tableData.startOvulation} onChange={e => onChangeInput(e)} />
							</td>
							<td className='mcTableBodyTd notes'>
								<textarea type='text' name='emotionalNotes' value={tableData.emotionalNotes} onChange={e => onChangeInput(e)} />
							</td>
							<td className='mcTableBodyTd notes'>
								<textarea type='text' name='notes' value={tableData.notes} onChange={e => onChangeInput(e)} />
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