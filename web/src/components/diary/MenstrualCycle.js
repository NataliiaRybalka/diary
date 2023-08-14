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
	const [tableData, setTableData] = useState([{
		'month': '',
		'startDate': '',
		'endDate': '',
		'durationMenstruation': '',
		'durationCycle': '',
		'startOvulation': '',
		'emotionalNotes': '',
		'notes': '',
	}]);
	const [rows, setRows] = useState(1);
	const [updatedRow, setUpdatedRow] = useState();

	useEffect(() => {
		getMenstrualCycleTable();
	}, []);

	const getMenstrualCycleTable = async () => {
		const res = await fetch(`${SERVER}/diary/menstrual-cycle/${JSON.parse(localStorage.getItem('user')).id}`);
		const data = await res.json();
		setTableData(data);
		setRows(data.length);
	};

	const handleAddRow = () => {
		setTableData([...tableData, {
			'month': '',
			'startDate': '',
			'endDate': '',
			'durationMenstruation': '',
			'durationCycle': '',
			'startOvulation': '',
			'emotionalNotes': '',
			'notes': '',
		}]);
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

			<button className='addRemoveRow addRemoveRowTable' onClick={handleAddRow}>+</button>
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
								<input type='number' name='durationMenstruation' value={tableData[rowI]?.durationMenstruation} onChange={e => onChangeInput(e, rowI)} />
							</td>
							<td className='mcTableBodyTd mcTableBodyTdNumber'>
								<input type='number' name='durationCycle' value={tableData[rowI]?.durationCycle} onChange={e => onChangeInput(e, rowI)} />
							</td>
							<td className='mcTableBodyTd'>
								<input type='date' name='startOvulation' value={tableData[rowI]?.startOvulation} onChange={e => onChangeInput(e, rowI)} />
							</td>
							<td className='mcTableBodyTd notes'>
								<textarea type='text' name='emotionalNotes' value={tableData[rowI]?.emotionalNotes} onChange={e => onChangeInput(e, rowI)} />
							</td>
							<td className='mcTableBodyTd notes'>
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