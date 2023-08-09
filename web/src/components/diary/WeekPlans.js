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
	const [inputValue, setInputValue] = useState('');
	const [dayPlan, setDayPlan] = useState([]);
	const [weekPlan, setWeekPlan] = useState([]);

	const handleAddRow = () => setRows(rows + 1);
	const handleRemoveRow = () => setRows(rows - 1);

	const saveDayPlan = () => {
		if (Object.values(inputValue) === '') return;
		if (!dayPlan.length) return setDayPlan([inputValue]);

		let newArr = dayPlan;
		const currentPlanIndex = newArr.findIndex(el => Object.keys(el)[0] === Object.keys(inputValue)[0]);
		if (currentPlanIndex >=0 ) return newArr.splice(currentPlanIndex, 1, inputValue);

		const prevElIndex = newArr.findIndex(el => Number(Object.keys(el)[0]) + 1 === Number(Object.keys(inputValue)[0]));

		if (prevElIndex < 0) {
			newArr.push(inputValue);
			return setDayPlan(newArr);
		}

		newArr.splice(prevElIndex + 1, 0, inputValue);
		setDayPlan(newArr);
	};
	
	const saveWeekPaln = () => {
		console.log('aaaaa', dayPlan);
	};

	return (
		<div>
			<h1>{t('Week Plans')}</h1>

			<Menu />

			<div className='weekPlanDiv'>
				<div className='dayPlanDiv'>
					<h3>{dates[0]}</h3>

					<div>
						<button className='addRemoveRow' onClick={handleAddRow}>+</button>
						<button className='addRemoveRow' onClick={handleRemoveRow}>-</button>
						{[...Array(rows)].map((el, i) => (
							<input
								key={i} type='text' className='planInput'
								onChange={(e) => setInputValue({[i]: e.target.value})}
								onBlur={saveDayPlan}
							/> 
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
			
			<button className='submit save' onClick={saveWeekPaln}>{t('Save')}</button>
		</div>
	);
};

export default WeekPlans;