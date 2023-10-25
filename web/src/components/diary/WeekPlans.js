import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getMonday, getWeekDays } from '../../lib/getDates';
import Menu from './Menu';
import { SERVER } from '../../lib/constants';
import TimePicker from '../pages/TimePicker';

import './WeekPlans.css';

function WeekPlans() {
	const { t } = useTranslation();

	let lang = useSelector(state => state.language.value);

	const [dates, setDates] = useState([]);
	const [engDates, setEngDates] = useState([]);
	const [savedWeekPlan, setSavedWeekPlan] = useState({});
	const [updatedDay, setUpdatedDay] = useState();
	const [weekPlan, setWeekPlan] = useState({});
	const [rows, setRows] = useState({
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
	});
	const [showPicker, setShowPicker] = useState(false);
	const [time, setTime] = useState('');
	const [updatedRow, setUpdatedRow] = useState(null);

	useEffect(() => {
		getWeekPlan();
	}, []);

	useEffect(() => {
		if (lang === 'ua') lang = 'uk';
		const week = getWeekDays(lang);
		setDates(week);

		if (lang !== 'en') {
			const week = getWeekDays('en');
			return setEngDates(week);
		} 
		setEngDates(week);		
	}, [lang]);

	useEffect(() => {
		engDates.forEach(day => {
			setWeekPlan(prev => ({
				...prev,
				[day]: {
					plans: [],
				}
			}));
		});
	}, [engDates]);

	const getWeekPlan = async () => {
		const monday = await getMonday(new Date());
		const res = await fetch(`${SERVER}/diary/week-plan/${JSON.parse(localStorage.getItem('user')).id}/${monday}`);
		const data = await res.json();

		const newRows = rows;
		const weekPlans = {};
		data.forEach((day, i) => {
			if (!day) return;

			const date = day.date;
			if (date.includes('Monday')) newRows[0] = day.plans.length;
			else if (date.includes('Tuesday')) newRows[1] = day.plans.length;
			else if (date.includes('Wednesday')) newRows[2] = day.plans.length;
			else if (date.includes('Thursday')) newRows[3] = day.plans.length;
			else if (date.includes('Friday')) newRows[4] = day.plans.length;
			else if (date.includes('Saturday')) newRows[5] = day.plans.length;
			else if (date.includes('Sunday')) newRows[6] = day.plans.length;

			return weekPlans[date] = day;
		})
		setRows(newRows);
		setSavedWeekPlan(weekPlans);
	};

	const handleAddRow = (rowNumber) => {
		setRows(prev => ({
			...prev,
			[rowNumber]: rows[rowNumber] + 1
		}));

		setWeekPlan(prev => ({
			...prev,
			[engDates[rowNumber]]: {
				...prev[engDates[rowNumber]],
				plans: [
					...weekPlan[engDates[rowNumber]].plans,
					{
						time: '00:00',
						plan: '',
					}
				],
			}
		}));
	};
	const handleRemoveRow = (rowNumber) => {
		if (rows[rowNumber] > 0) {
			setRows(prev => ({
				...prev,
				[rowNumber]: rows[rowNumber] - 1
			}));
		}
	}

	const onChangeInput = (e, rowNumber, day) => {
		if (e.target.name === 'time') {
			if (weekPlan[day]?.plans[rowNumber]) {
				const newInputValue = weekPlan;
				newInputValue[day].plans[rowNumber].time = e.target.value;
				return setWeekPlan(newInputValue);
			}

			if (weekPlan[day]?.plans) {
				const updatedPlans = weekPlan[day].plans;
				updatedPlans.push({
					time: e.target.value,
				});
				return setWeekPlan(prev => ({
					...prev,
					[day]: {
						...prev[day],
						plans: updatedPlans,
					}
				}));
			}

			return setWeekPlan(prev => ({
				...prev,
				[day]: {
					plans: [{
						time: e.target.value,
					}]
				}
			}));
		}
		
		if (e.target.name === 'plan') {
			if (weekPlan[day]?.plans[rowNumber]) {
				const newInputValue = weekPlan;
				newInputValue[day].plans[rowNumber].plan = e.target.value;
				return setWeekPlan(newInputValue);
			}

			if (weekPlan[day]?.plans) {
				const updatedPlans = weekPlan[day].plans;
				updatedPlans.push({
					time: '00:00',
					plan: e.target.value,
				});
				return setWeekPlan(prev => ({
					...prev,
					[day]: {
						...prev[day],
						plans: updatedPlans,
					}
				}));
			}

			return setWeekPlan(prev => ({
				...prev,
				[day]: {
					plans: [{
						time: '00:00',
						plan: e.target.value,
					}]
				}
			}));
		}
	};
	const onUpdateInput = (e, rowNumber, day) => {
		const updatedDay = savedWeekPlan[day];
		const updatedPlans = updatedDay.plans;
		const oldPlan = updatedPlans[rowNumber] || {};
		oldPlan[e.target.name] = e.target.value;
		updatedPlans[rowNumber] = oldPlan;
		setSavedWeekPlan(prev => ({
			...prev,
			updatedDay,
		}));

		setUpdatedDay(updatedDay);
	};
	const saveWeekPlan = async (day) => {
		const endpoint = updatedDay ? `/week-plan/${updatedDay._id}` : `/day-plan/${JSON.parse(localStorage.getItem('user')).id}`;
		const method = updatedDay ? 'PUT' : 'POST';
		const body = updatedDay 
			? {
				plans: updatedDay.plans,
				timezone: new Date().getTimezoneOffset()/60,
				user: localStorage.getItem('user'),
				language: lang,
			}
			: {
				date: day,
				plans: Object.values(weekPlan[day]),
				timezone: new Date().getTimezoneOffset()/60,
				language: lang,
			}

		const res = await fetch(`${SERVER}/diary${endpoint}`, {
			method,
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();
		setWeekPlan(prev => ({
			...prev,
			[data.date]: data
		}));
	};

	return (
		<div>
			<h1>{t('Week Plans')}</h1>
			<Menu />

			<div>
				{[...Array(7)].map((day, dayNum) => (
					<div className='dayPlanDiv' key={dayNum}>
						<h3>{dates[dayNum]}</h3>

						<div>
							<button className='addRemoveRow' onClick={() => handleAddRow(dayNum)}>+</button>
							<button className='addRemoveRow' onClick={() => handleRemoveRow(dayNum)}>-</button>
							{[...Array(rows[dayNum])].map((row, rowNumber) => (
								<div className='inputs' name={engDates[dayNum]} key={rowNumber} >
									{/* {
										savedWeekPlan[engDates[dayNum]]?.plans
										? <input
											type='time' name='time' className='timeInput'
											value={savedWeekPlan[engDates[dayNum]]?.plans[rowNumber]?.time}
											onChange={(e) => onUpdateInput(e, rowNumber, engDates[dayNum])}
										/>
										: <input
											type='time' name='time' className='timeInput'
											onChange={(e) => onChangeInput(e, rowNumber, engDates[dayNum])}
										/>
									} */}
									<div>
										{(showPicker && updatedRow === rowNumber)
											? <TimePicker time={time} setTime={setTime} setShowPicker={setShowPicker} />
											: <div
												onClick={() => {
													setUpdatedRow(rowNumber);
													setShowPicker(!showPicker)
												}}
											>
												{(time && updatedRow === rowNumber)
													? time
													: savedWeekPlan[engDates[dayNum]]?.plans[rowNumber]?.time
												}
											</div>
										}
									</div>

									{
										savedWeekPlan[engDates[dayNum]]?.plans
										? <input
											type='text' name='plan' className='planInput'
											value={savedWeekPlan[engDates[dayNum]]?.plans[rowNumber]?.plan}
											onChange={(e) => onUpdateInput(e, rowNumber, engDates[dayNum])}
										/>
										: <input
											type='text' name='plan' className='planInput'
											onChange={(e) => onChangeInput(e, rowNumber, engDates[dayNum])}
										/>
									}
								</div>
							))}
							<button className='submit save' onClick={() => saveWeekPlan(engDates[dayNum])}>{t('Save')}</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default WeekPlans;