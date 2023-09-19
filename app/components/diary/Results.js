import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

import { SERVER } from '../../lib/constants';

function Results() {
	const { t } = useTranslation();

	const fieldsList = [
		'Month',
		'Sleep (h)',
		'Physical activity',
	];
	const [tableData, setTableData] = useState([{
		month: '',
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
		<View>
			<Text>results</Text>

			{/* <div>
			<h1>{t('Results')}</h1>
			<Menu />

			<table className='menstrualCycleTable'>
				<thead>
					<tr>{fieldsList.map(field => <th key={field}>{t(field)}</th>)}</tr>
				</thead>

				<tbody>
					{[...Array(rows)].map((row, rowI) => (
						<tr key={rowI}>
							<td>{tableData[rowI]._id}</td>
							<td>{tableData[rowI].totalHours}</td>
							<td>{tableData[rowI].physicalActivity}</td>
						</tr>
					))}
				</tbody>
			</table>
			</div> */}
		</View>
	);
};

export default Results;