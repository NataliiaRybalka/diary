import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Menu from './Menu';
import { SERVER } from '../../lib/constants';

function MonthResults() {
	const { t } = useTranslation();

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

	useEffect(() => {
		getMonthResult();
	}, []);

	const getMonthResult = async () => {
		const res = await fetch(`${SERVER}/diary/result/${JSON.parse(localStorage.getItem('user')).id}`);
		const data = await res.json();
	};

	return (
		<div>
			<h1>{t('Month Results')}</h1>

			<Menu />

			<table className='menstrualCycleTable'>
				<thead>
					<tr>{fieldsList.map(field => <th key={field}>{t(field)}</th>)}</tr>
				</thead>

				<tbody>
					{[...Array(rows)].map((row, rowI) => (
						<tr key={rowI}>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MonthResults;