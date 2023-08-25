import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Menu from './Menu';
import { SERVER } from '../../lib/constants';

function MonthResults() {
	const { t } = useTranslation();

	const bgColour = localStorage.getItem('bgColour');

	const fieldsList = [
		'Date',
		'Feeling of happiness',
		'Day of the menstrual cycle',
		'Self care',
		'Meditation',
		'Sleep (h)',
		'Physical activity',
		'Drank some water'
	];
	const [tableData, setTableData] = useState([{
		date: '',
		happiness: '',
		menstrualDay: '',
		selfCare: false,
		meditation: false,
		totalHours: '',
		physicalActivity: '',
		drankWater: '',
	}]);
	const [rows, setRows] = useState(0);
	const [month, setMonth] = useState('');

	useEffect(() => {
		const date = new Date();
		const year = date.getFullYear();
		let month = String(date.getMonth() + 1);
		month = month.length === 1 ? `0${month}` : month;
		setMonth(`${year}-${month}`);
	}, []);

	useEffect(() => {
		getMonthResult();
	}, [month]);

	const getMonthResult = async () => {
		const res = await fetch(`${SERVER}/diary/result/${JSON.parse(localStorage.getItem('user')).id}/${month}`);
		const data = await res.json();

		setRows(data.length);
		setTableData(data);
	};

	return (
		<div>
			<input
				type='month' name='chosenDate' value={month}
				onChange={e => setMonth(e.target.value)}
				style={{ backgroundColor: bgColour }}
				className='chooseDateInp'
			/>
			<h1>{t('Month Results')}</h1>
			<Menu />

			<table className='menstrualCycleTable'>
				<thead>
					<tr>{fieldsList.map(field => <th key={field}>{t(field)}</th>)}</tr>
				</thead>

				<tbody>
					{[...Array(rows)].map((row, rowI) => (
						<tr key={rowI}>
							<td>{tableData[rowI].date}</td>
							<td>{tableData[rowI].happiness}</td>
							<td>{tableData[rowI].menstrualDay}</td>
							<td>
								{!!tableData[rowI].selfCare && <span>&#10003;</span>}
							</td>
							<td>
								{!!tableData[rowI].meditation && <span>&#10003;</span>}
							</td>
							<td>{tableData[rowI].totalHours}</td>
							<td>{tableData[rowI].physicalActivity}</td>
							<td>{tableData[rowI].drankWater}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MonthResults;