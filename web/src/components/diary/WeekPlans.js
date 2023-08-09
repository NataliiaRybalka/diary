import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getWeekDays } from '../../lib/getDates';
import Menu from './Menu';

import './WeekPlans.css';

function WeekPlans() {
	const { t } = useTranslation();

	let lang = localStorage.getItem('lang');
	if (lang === 'ua') lang = 'uk';

	const [dates, setDates] = useState([]);
	const [rows, setRows] = useState({
		0: 1,
		1: 1,
		2: 1,
		3: 1,
		4: 1,
		5: 1,
		6: 1,
	});
	const [inputValue, setInputValue] = useState();
	const [dayPlan, setDayPlan] = useState();

	useEffect(() => {
		const week = getWeekDays(lang);
		setDates(week);
	}, [lang]);

	const handleAddRow = (rowNumber) => {
		setRows(prev => ({
			...prev,
			[rowNumber]: rows[rowNumber] + 1
		}));
	};
	const handleRemoveRow = (rowNumber) => {
		if (rows[rowNumber] > 1) {
			setRows(prev => ({
				...prev,
				[rowNumber]: rows[rowNumber] - 1
			}));
		}
	}

	const onChangeInput = (e, i) => {
		setInputValue({
			[e.target.name]: {[i]: e.target.value}
		})
	};
	const saveDayPlan = () => {
		if (Object.values(inputValue) === '') return;
		if (!dayPlan) {
			return setDayPlan({
				[Object.keys(inputValue)[0]]: [inputValue[Object.keys(inputValue)[0]]]
			});
		}

		const day = Object.keys(dayPlan)[0];
		let newArr = dayPlan[day];
		const currentPlanIndex = newArr.findIndex(el => Object.keys(el)[0] === Object.keys(inputValue)[0]);
		if (currentPlanIndex >=0 ) return newArr.splice(currentPlanIndex, 1, inputValue[day]);

		const prevElIndex = newArr.findIndex(el => Number(Object.keys(el)[0]) + 1 === Number(Object.keys(inputValue)[0]));

		if (prevElIndex < 0) {
			newArr.push(inputValue[day]);
			return setDayPlan({[day]: newArr});
		}

		newArr.splice(prevElIndex + 1, 0, inputValue[day]);
		setDayPlan({[day]: newArr});
		setInputValue();
	};	
	const saveWeekPlan = () => {
		console.log('aaaaa', dayPlan);
		setDayPlan();
	};

	return (
		<div>
			<h1>{t('Week Plans')}</h1>

			<Menu />

			{[...Array(7)].map((day, dayNum) => (
				<div className='dayPlanDiv' key={dayNum}>
					<h3>{dates[dayNum]}</h3>

					<div>
						<button className='addRemoveRow' onClick={() => handleAddRow(dayNum)}>+</button>
						<button className='addRemoveRow' onClick={() => handleRemoveRow(dayNum)}>-</button>
						{[...Array(rows[dayNum])].map((row, rowNumber) => (
							<input
								key={rowNumber} type='text' name={dates[dayNum]} className='planInput'
								onChange={(e) => onChangeInput(e, rowNumber)}
								onBlur={saveDayPlan}
							/> 
						))}
						<button className='submit save' onClick={saveWeekPlan}>{t('Save')}</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default WeekPlans;