import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Menu from './Menu';
import { getWeekDays } from '../../lib/getDates';

import './WeekPlans.css';

function WeekPlans() {
	const { t } = useTranslation();

	let lang = localStorage.getItem('lang');
	if (lang === 'ua') lang = 'uk';

	const [dates, setDates] = useState([]);

	useEffect(() => {
		const week = getWeekDays(lang);
		setDates(week);
	}, [lang]);


	const [rows, setRows] = useState(1);
	const handleAddRow = () => setRows(rows + 1);
	const handleRemoveRow = () => setRows(rows - 1);

	return (
		<div>
			<h1>{t('Week Plans')}</h1>

			<Menu />

			<div className='weekPlanDiv'>
				<div className='dayPlanDiv'>
					<h3>{dates[0]}</h3>

					<div>
						<button className='addRemoveRaw' onClick={handleAddRow}>+</button>
						<button className='addRemoveRaw' onClick={handleRemoveRow}>-</button>
						{[...Array(rows)].map((el, i) => (
							<input key={i} type='text' className='planInput' /> 
						))}
					</div>
				</div>
				<div className='dayPlanDiv'>
					<h3>{dates[1]}</h3>
				</div>
				<div className='dayPlanDiv'>
					<h3>{dates[2]}</h3>
				</div>
				<div className='dayPlanDiv'>
					<h3>{dates[3]}</h3>
				</div>
				<div className='dayPlanDiv'>
					<h3>{dates[4]}</h3>
				</div>
				<div className='dayPlanDiv'>
					<h3>{dates[5]}</h3>
				</div>
				<div className='dayPlanDiv'>
					<h3>{dates[6]}</h3>
				</div>
			</div>
		</div>
	);
};

export default WeekPlans;