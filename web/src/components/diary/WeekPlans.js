import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getWeekDays, getMonday } from '../../lib/getDates';
import Menu from './Menu';
import { SERVER } from '../../lib/constants';
import TimePicker from '../pages/TimePicker';

import './WeekPlans.css';

function WeekPlans() {
	const { t } = useTranslation();
	const language = useSelector(state => state.language.value);

	const [currentDate, setCurrentDate] = useState(new Date());
	const [days, setDays] = useState([]);
	const [daysEng, setDaysEng] = useState([]);
	const [rows, setRows] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [showPicker, setShowPicker] = useState(false);
	const [updatedDay, setUpdatedDay] = useState(null);
	const [updatedRow, setUpdatedRow] = useState(null);
	const [time, setTime] = useState('');
	const [weekPlan, setWeekPlan] = useState([]);

	useEffect(() => {
		getWeekPlan();
	}, [currentDate]);

	useEffect(() => {
		changeWeek();
	}, [language]);

	useEffect(() => {
		if (time) {
			const newWeekPlan = weekPlan;
			newWeekPlan[updatedDay].plans[updatedRow].time = time;
			setWeekPlan(newWeekPlan);
		}
	}, [time]);

	const getWeekPlan = async () => {
		const monday = await getMonday(currentDate);
		const res = await fetch(`${SERVER}/diary/week-plan/${JSON.parse(localStorage.getItem('user')).id}/${monday}`);
		const data = await res.json();

		setWeekPlan(data);

		const newRows = [];
		data.forEach(day => day?.plans.length ? newRows.push(day?.plans.length) : newRows.push(0));
		setRows(newRows);
	};

	const changeWeek = async (type = null) => {
		const lang = language !== 'ua' ? language : 'uk';
		const startDate = type === 'prev' 
			? new Date(currentDate.getTime() - 604800000) 
			: type === 'next' 
				? new Date(currentDate.getTime() + 604800000)
				: currentDate;
		setCurrentDate(startDate);
		const mon = await getMonday(startDate);

		if (lang === 'en') {
			const week = getWeekDays(mon, lang);
			setDays(week);
			setDaysEng(week);
		}
		else {
			setDays(getWeekDays(mon, lang));
			setDaysEng(getWeekDays(mon, 'en'));
		}
	};

	const handleRows = (dayNum, type) => {
		if (type === '+'){
			setRows(rows.map((row, index) => {
				if (index === dayNum) row = row + 1;
				return row;
			}));

			const newWeekPlan = weekPlan;
			const dayPlan = newWeekPlan[dayNum];

			if (!dayPlan) newWeekPlan[dayNum] = {plans: [{time: '', plan: ''}]}
			else if (!dayPlan.plans) dayPlan.plans = [{time: '', plan: ''}]
			else dayPlan.plans = [...dayPlan.plans, {time: '', plan: ''}]

			setWeekPlan(newWeekPlan);
		}

		if (type === '-'){
			setRows(rows.map((row, index) => {
				if (index === dayNum) row = row > 0 ? row - 1 : 0;
				return row;
			}));

			const newWeekPlan = weekPlan;
			const dayPlan = newWeekPlan[dayNum];
			dayPlan.plans.pop();
			
			setWeekPlan(newWeekPlan);
		}
	};

	const onUpdateInput = (e, rowNumber, dayNum) => {
		setWeekPlan(weekPlan.map((dayPlan, index) => {
			if (index === dayNum) {
				dayPlan.plans[rowNumber].plan = e.target.value;
				return dayPlan;
			}
			return dayPlan;
		}))
	};

	const save = async (dayNum) => {
		const dayPlan = weekPlan[dayNum];
		const endpoint = dayPlan._id ? `week-plan/${dayPlan._id}` : `day-plan/${JSON.parse(localStorage.getItem('user')).id}`;
		const method = dayPlan._id ? 'PUT' : 'POST';
		const body = dayPlan._id
			? {
				plans: Object.values(dayPlan.plans),
				timezone: new Date().getTimezoneOffset()/60,
				user: localStorage.getItem('user'),
				language,
			}
			: {
				date: daysEng[dayNum],
				plans: Object.values(dayPlan.plans),
				timezone: new Date().getTimezoneOffset()/60,
				language,
			}

		const resp = await fetch(`${SERVER}/diary/${endpoint}`, {
			method,
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await resp.json();

		setWeekPlan(weekPlan.map((dayPlan, index) => {
			if (index === dayNum) dayPlan = data;
			return dayPlan;
		}));
	};

	return (
		<div>
			<h1>{t('Week Plans')}</h1>
			<Menu />

			<div className='arrowsConatiner'>
				<span onClick={() => changeWeek('prev')}> {'<'} </span>
				<span onClick={() => changeWeek('next')}> {'>'} </span>
			</div>

			<div>
				{[...Array(7)].map((day, dayNum) => (
					<div className='dayPlanDiv' key={dayNum}>
						<h3>{days[dayNum]}</h3>

						<div>
							<button className='addRemoveRow' onClick={() => handleRows(dayNum, '+')}>+</button>
							<button className='addRemoveRow' onClick={() => handleRows(dayNum, '-')}>-</button>

							{[...Array(rows[dayNum])].map((row, rowNumber) => (
								<div className='inputs' key={rowNumber}>
									<div className='pickerDivTime'>
										{(showPicker && updatedDay === dayNum && updatedRow === rowNumber)
											? <TimePicker time={time} setTime={setTime} setShowPicker={setShowPicker} />
											: <div
												onClick={() => {
													setUpdatedRow(rowNumber);
													setUpdatedDay(dayNum);
													setShowPicker(!showPicker);
												}}
												className='monthInput'
											>
												{(time && updatedDay === dayNum && updatedRow === rowNumber)
													? time
													: weekPlan[dayNum]?.plans[rowNumber]?.time
												}
											</div>
										}
									</div>

									<input
										type='text' name='plan' className='planInput'
										value={weekPlan[dayNum]?.plans[rowNumber]?.plan}
										onChange={(e) => onUpdateInput(e, rowNumber, dayNum)}
									/>
								</div>
							))}

							<button className='submit save' onClick={() => save(dayNum)}>{t('Save')}</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default WeekPlans;