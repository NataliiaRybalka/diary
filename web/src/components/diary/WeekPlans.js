import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getMonday, getWeekDays } from '../../lib/getDates';
import Menu from './Menu';
import { SERVER } from '../../lib/constants';

import './WeekPlans.css';

function WeekPlans() {
	const { t } = useTranslation();

	let lang = localStorage.getItem('lang');
	if (lang === 'ua') lang = 'uk';

	const [dates, setDates] = useState([]);
	const [engDates, setEngDates] = useState([]);
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
	const [weekPlan, setWeekPlan] = useState({});

	useEffect(() => {
		getWeekPlan();
	}, []);

	useEffect(() => {
		if (lang !== 'en') {
			const week = getWeekDays('en');
			setEngDates(week);
		}
		const week = getWeekDays(lang);
		setDates(week);
	}, [lang]);

	const getWeekPlan = async () => {
		const monday = await getMonday(new Date());
		const res = await fetch(`${SERVER}/week-plan/${monday}`);
		const data = await res.json();

		const newRows = rows;
		const weekPlans = {};
		data.forEach((day, i) => {
			if (!day) return;
			newRows[i] = day.plans.length;
			const date = day.date;
			return weekPlans[date] = day;
		})
		setRows(newRows);
		setWeekPlan(weekPlans);
	};

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

			if (inputValue && inputValue[dayNum]) {
				return setInputValue(prev => ({
					[dayNum]: [
						...prev[dayNum],
						{
							time: '00:00',
							plan: e.target.value,
						}
					]
				}));
			}

			return setInputValue({
				[dayNum]: [
					{
						time: '00:00',
						plan: e.target.value,
					}
				]
			});
		}

		if (e.target.name === 'time') {
			if (inputValue && inputValue[dayNum] && inputValue[dayNum][rowNumber]) {
				const newInputValue = inputValue;
				newInputValue[dayNum][rowNumber]['time'] = e.target.value;
				return setInputValue(newInputValue);
			}

			if (inputValue && inputValue[dayNum]) {
				return setInputValue(prev => ({
					[dayNum]: [
						...prev[dayNum],
						{
							time: e.target.value,
						}
					]
				}));
			}

			return setInputValue({
				[dayNum]: [
					{
						time: e.target.value,
					}
				]
			});
		}
	};
	const saveWeekPlan = async () => {
		const resp = await fetch(`${SERVER}/day-plan`, {
			method: 'POST',
			body: JSON.stringify({
				date: Object.keys(inputValue)[0],
				plans: Object.values(inputValue)[0],
				user_id: JSON.parse(localStorage.getItem('user')).id,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await resp.json();
		setWeekPlan(prev => ({
			...prev,
			[data.date]: data
		}));
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
							<div className='inputs' name={engDates[dayNum]} key={rowNumber} >
								<input
									type='time' name='time' className='timeInput'
									value={
										(
											weekPlan[engDates[dayNum]] 
											&& weekPlan[engDates[dayNum]].plans 
											&& weekPlan[engDates[dayNum]].plans[rowNumber]
										) && weekPlan[engDates[dayNum]].plans[rowNumber].time
									}
									onChange={(e) => onChangeInput(e, rowNumber, engDates[dayNum])}
								/>
								<input
									type='text' name='plan' className='planInput'
									value={
										(
											weekPlan[engDates[dayNum]] 
											&& weekPlan[engDates[dayNum]].plans 
											&& weekPlan[engDates[dayNum]].plans[rowNumber]
										) && weekPlan[engDates[dayNum]].plans[rowNumber].plan
									}
									onChange={(e) => onChangeInput(e, rowNumber, engDates[dayNum])}
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