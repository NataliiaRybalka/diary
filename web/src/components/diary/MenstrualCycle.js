import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Menu from './Menu';

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
	const [data, setData] = useState({
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
		setData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	};

	const onHandleSave = async () => {
		console.log(data);
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
								<input type='month' name='month' value={data.month} onChange={e => onChangeInput(e)} />
							</td>
							<td className='mcTableBodyTd'>
								<input type='date' name='startDate' value={data.startDate} onChange={e => onChangeInput(e)} />
							</td>
							<td className='mcTableBodyTd'>
								<input type='date' name='endDate' value={data.endDate} onChange={e => onChangeInput(e)} />
							</td>
							<td className='mcTableBodyTd mcTableBodyTdNumber'>
								<input type='number' name='durationMenstruation' value={data.durationMenstruation} onChange={e => onChangeInput(e)} />
							</td>
							<td className='mcTableBodyTd mcTableBodyTdNumber'>
								<input type='number' name='durationCycle' value={data.durationCycle} onChange={e => onChangeInput(e)} />
							</td>
							<td className='mcTableBodyTd'>
								<input type='date' name='startOvulation' value={data.startOvulation} onChange={e => onChangeInput(e)} />
							</td>
							<td className='mcTableBodyTd notes'>
								<textarea type='text' name='emotionalNotes' value={data.emotionalNotes} onChange={e => onChangeInput(e)} />
							</td>
							<td className='mcTableBodyTd notes'>
								<textarea type='text' name='notes' value={data.notes} onChange={e => onChangeInput(e)} />
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