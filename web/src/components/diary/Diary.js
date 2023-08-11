import { useTranslation } from 'react-i18next';

import Menu from './Menu';

import './Diary.css';

function Diary() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t('Diary')}</h1>

			<Menu />

			<div>
				<h3>{t('Morning')}</h3>
				<div className='affirmationDiv'>
					<input type='text' name='affirmation' />
					<label>{t('affirmation')}</label>
				</div>

				<div className='morningInputDiv'>
					<div>
						<label>{t('Day of the menstrual cycle ')}</label>
						<input type='number' min={1} />
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
							<input type='number' max={24} />
						</div>
					</div>
				</div>

				<h3>{t('Evening')}</h3>
				<div className='eveningCheckboxDiv'>
					<div>
						<label>{t('Feeling of happiness ')}</label>
						<input type='number' min={1} max={10} />
					</div>
					<div>
						<label>{t('Self care')}</label> <input type='checkbox' />
					</div>
					<div>
						<label>{t('Meditation')}</label> <input type='checkbox' />
					</div>
				</div>

				<div>
					<label>{t('Upset me: ')}</label>
					<input type='text' name='upsetMe' />
				</div>
				<div>
					<label>{t('What am I grateful for today: ')}</label>
					<input type='text' name='grateful' />
				</div>

				<div>
					<div>
						<label>{t('Drank some water ')}</label>
						<input type='number' />
					</div>
					<div>
						<label>{t('Physical activity ')}</label>
						<input type='number' min={1} max={10} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Diary;