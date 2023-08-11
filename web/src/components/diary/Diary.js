import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getToday } from '../../lib/getDates';
import Menu from './Menu';
import { SERVER } from '../../lib/constants';

import './Diary.css';

function Diary() {
	const { t } = useTranslation();

	let lang = localStorage.getItem('lang');
	if (lang === 'ua') lang = 'uk';

	const [data, setData] = useState({
		affirmation: '',
		menstrualDay: '',
		fellAsleep: '',
		wokeUp: '',
		totalHours: '',
		happiness: '',
		selfCare: false,
		meditation: false,
		upsetMe: '',
		grateful: '',
		drankWater: '',
		physicalActivity: '',
	});
	const [engToday, setEngToday] = useState();
	const [today, setToday] = useState();

	useEffect(() => {
		const today = getToday(lang);
		setToday(today);
		setEngToday(today);

		if (lang !== 'en') {
			const engToday = getToday('en');
			setEngToday(engToday);
		}
	}, [lang]);

	const onChangeInput = (e) => {
		if (e.target.name === 'selfCare' || e.target.name === 'meditation') {
			return setData(prev => ({
				...prev,
				[e.target.name]: e.target.checked
			}));
		}
		setData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};

	const saveData = async () => {
		const resp = await fetch(`${SERVER}/diary/page/${engToday}`, {
			method: 'POST',
			body: JSON.stringify({
				data,
				user_id: JSON.parse(localStorage.getItem('user')).id,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	return (
		<div>
			<h1>{t('Diary')}</h1>

			<Menu />

			<div>
				<h3 className='todayDate'>{today}</h3>
				<h3 className='dayPart'>{t('Morning')}</h3>

				<div className='affirmationDiv'>
					<input type='text' name='affirmation' value={data.affirmation} onChange={e => onChangeInput(e)} />
					<label>{t('affirmation')}</label>
				</div>

				<div className='morningInputDiv'>
					<div>
						<label>{t('Day of the menstrual cycle ')}</label>
						<input type='number' name='menstrualDay' min={1} value={data.menstrualDay} onChange={e => onChangeInput(e)} className='pageInputNum' />
					</div>

					<div>
						<div>
							<label>{t('Fell asleep yesterday ')}</label>
							<input type='time' name='fellAsleep' value={data.fellAsleep} onChange={e => onChangeInput(e)} />
						</div>
						<div>
							<label>{t('Woke up today ')}</label>
							<input type='time' name='wokeUp' value={data.wokeUp} onChange={e => onChangeInput(e)} />
						</div>
						<div>
							<label>{t('Total hours of sleep per day ')}</label>
							<input type='number' name='totalHours' max={24} value={data.totalHours} onChange={e => onChangeInput(e)} className='pageInputNum' />
						</div>
					</div>
				</div>

				<h3 className='dayPart'>{t('Evening')}</h3>
				<div className='eveningCheckboxDiv'>
					<div>
						<label>{t('Feeling of happiness ')}</label>
						<input type='number' name='happiness' min={1} max={10} value={data.happiness} onChange={e => onChangeInput(e)} className='pageInputNum' />
					</div>
					<div>
						<label>{t('Self care')}</label> <input type='checkbox' name='selfCare' value={data.selfCare} onChange={e => onChangeInput(e)} />
					</div>
					<div>
						<label>{t('Meditation')}</label> <input type='checkbox' name='meditation' value={data.meditation} onChange={e => onChangeInput(e)} />
					</div>
				</div>

				<div className='eveningInputDiv'>
					<label>{t('Upset me: ')}</label>
					<input type='text' name='upsetMe' value={data.upsetMe} onChange={e => onChangeInput(e)} />
				</div>
				<div className='eveningInputDiv'>
					<label>{t('What am I grateful for today: ')}</label>
					<input type='text' name='grateful' value={data.grateful} onChange={e => onChangeInput(e)} />
				</div>

				<div className='eveningNumDiv'>
					<div>
						<label>{t('Drank some water ')}</label>
						<input type='number' name='drankWater' value={data.drankWater} onChange={e => onChangeInput(e)} className='pageInputNum' />
					</div>
					<div>
						<label>{t('Physical activity ')}</label>
						<input type='number' name='physicalActivity' min={1} max={10} value={data.physicalActivity} onChange={e => onChangeInput(e)} className='pageInputNum' />
					</div>
				</div>

				<button className='submit savePage' onClick={saveData}>{t('Save')}</button>
			</div>
		</div>
	);
};

export default Diary;