import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Menu from './Menu';
import { SERVER } from '../../lib/constants';

function Results() {
	const { t } = useTranslation();

	const fieldsList = [
		'Month',
		'Feeling of happiness',
		'Sleep (h)',
		'Physical activity',
	];
	const [tableData, setTableData] = useState([{
		month: '',
		happiness: '',
		totalHours: '',
		physicalActivity: '',
	}]);
	const [rows, setRows] = useState(0);

	useEffect(() => {
		getMonthResult();
	}, []);

	const getMonthResult = async () => {
		const res = await fetch(`${SERVER}/diary/result/${JSON.parse(localStorage.getItem('user')).id}`);
		const data = await res.json();

		setRows(data.length);
		setTableData(data);
	};

	return (
		<div>
			<h1>{t('Results')}</h1>
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

export default Results;