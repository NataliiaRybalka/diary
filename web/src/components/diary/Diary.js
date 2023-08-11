import { useTranslation } from 'react-i18next';

import { getToday } from '../../lib/getDates';
import Menu from './Menu';

import './Diary.css';
import { useEffect, useState } from 'react';

function Diary() {
	const { t } = useTranslation();

	let lang = localStorage.getItem('lang');
	if (lang === 'ua') lang = 'uk';

	const [today, setToday] = useState();

	useEffect(() => {
		setToday(getToday(lang));
	}, [lang]);

	return (
		<div>
			<h1>{t('Diary')}</h1>

			<Menu />

			<div>
				<h3 className='todayDate'>{today}</h3>
				<h3 className='dayPart'>{t('Morning')}</h3>

				<div className='affirmationDiv'>
					<input type='text' name='affirmation' />
					<label>{t('affirmation')}</label>
				</div>

				<div className='morningInputDiv'>
					<div>
						<label>{t('Day of the menstrual cycle ')}</label>
						<input type='number' min={1} className='pageInputNum' />
					</div>

					<div>
						<div>
							<label>{t('Fell asleep yesterday ')}</label>
							<input type='time' />
						</div>
						<div>
							<label>{t('Woke up today ')}</label>
							<input type='time' />
						</div>
						<div>
							<label>{t('Total hours of sleep per day ')}</label>
							<input type='number' max={24} className='pageInputNum' />
						</div>
					</div>
				</div>

				<h3 className='dayPart'>{t('Evening')}</h3>
				<div className='eveningCheckboxDiv'>
					<div>
						<label>{t('Feeling of happiness ')}</label>
						<input type='number' min={1} max={10} className='pageInputNum' />
					</div>
					<div>
						<label>{t('Self care')}</label> <input type='checkbox' />
					</div>
					<div>
						<label>{t('Meditation')}</label> <input type='checkbox' />
					</div>
				</div>

				<div className='eveningInputDiv'>
					<label>{t('Upset me: ')}</label>
					<input type='text' name='upsetMe' />
				</div>
				<div className='eveningInputDiv'>
					<label>{t('What am I grateful for today: ')}</label>
					<input type='text' name='grateful' />
				</div>

				<div>
					<div>
						<label>{t('Drank some water ')}</label>
						<input type='number' className='pageInputNum' />
					</div>
					<div>
						<label>{t('Physical activity ')}</label>
						<input type='number' min={1} max={10} className='pageInputNum' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Diary;