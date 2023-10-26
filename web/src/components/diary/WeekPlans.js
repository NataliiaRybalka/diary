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
	}, []);

	useEffect(() => {
		const lang = language !== 'ua' ? language : 'uk';
		if (lang === 'en') {
			const week = getWeekDays(lang);
			setDays(week);
			setDaysEng(week);
		}
		else {
			setDays(getWeekDays(lang));
			setDaysEng(getWeekDays('en'));
		}
	}, [language]);

	useEffect(() => {
		if (time) {
			const newWeekPlan = weekPlan;
			newWeekPlan[updatedDay].plans[updatedRow].time = time;
			setWeekPlan(newWeekPlan);
		}
	}, [time]);

	const getWeekPlan = async () => {
		const monday = await getMonday(new Date());
		const res = await fetch(`${SERVER}/diary/week-plan/${JSON.parse(localStorage.getItem('user')).id}/${monday}`);
		const data = await res.json();

		setWeekPlan(data);

		const newRows = [];
		data.forEach(day => day?.plans.length ? newRows.push(day?.plans.length) : newRows.push(0));
		setRows(newRows);
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
		const resp = await fetch(`${SERVER}/diary/day-plan/${JSON.parse(localStorage.getItem('user')).id}`, {
			method: 'POST',
			body: JSON.stringify({
				date: daysEng[dayNum],
				plans: Object.values(weekPlan[dayNum]),
				timezone: new Date().getTimezoneOffset()/60,
				language,
			}),
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