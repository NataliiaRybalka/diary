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

	return (
		<div>
			<h1>{t('Week Plans')}</h1>

			<Menu />

			<div className='weekPlanDiv'>
				<div className='dayPlanDiv'>
					<h3>{dates[0]}</h3>
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