import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getWeekDays } from '../../lib/getDates';
import Menu from './Menu';
import { SERVER } from '../../lib/constants';

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

	const onChangeInput = (e, rowNumber, dayNum) => {
		if (e.target.name === 'plan') {
			if (inputValue && inputValue[dayNum] && inputValue[dayNum][rowNumber]) {
				const newInputValue = inputValue;
				newInputValue[dayNum][rowNumber]['plan'] = e.target.value;
				return setInputValue(newInputValue);
			}

			return setInputValue({
				[dayNum]: {
					[rowNumber]: {
						plan: e.target.value,
					}
				}
			});
		}

		if (e.target.name === 'time') {
			if (inputValue && inputValue[dayNum] && inputValue[dayNum][rowNumber]) {
				const newInputValue = inputValue;
				newInputValue[dayNum][rowNumber]['time'] = e.target.value;
				return setInputValue(newInputValue);
			}

			return setInputValue({
				[dayNum]: {
					[rowNumber]: {
						time: e.target.value,
					}
				}
			});
		}
	};
	console.log(inputValue);
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
	const saveWeekPlan = async () => {
		const resp = await fetch(`${SERVER}/day-plan`, {
			method: 'POST',
			body: JSON.stringify({
				date: Object.keys(dayPlan)[0],
				plans: Object.values(dayPlan)[0],
				user: localStorage.getItem('user'),
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log('aaaaa', await resp.json());
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
							<div className='inputs' name={dates[dayNum]} key={rowNumber} >
								<input
									type='time' name='time'
									value={
										(
											inputValue 
											&& inputValue[dates[dayNum]]
											&& inputValue[dates[dayNum]][rowNumber]
											&& inputValue[dates[dayNum]][rowNumber]['time']
										) 
										? inputValue[dates[dayNum]][rowNumber]['time'] 
										: '09:00'
									}
									className='timeInput'
									onChange={(e) => onChangeInput(e, rowNumber, dates[dayNum])}
								/>
								<input
									type='text' name='plan' className='planInput'
									onChange={(e) => onChangeInput(e, rowNumber, dates[dayNum])}
									onBlur={saveDayPlan}
								/>
							</div>
						))}
						<button className='submit save' onClick={saveWeekPlan}>{t('Save')}</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default WeekPlans;