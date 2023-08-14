import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getDateInLang, getToday } from '../../lib/getDates';
import Menu from './Menu';
import { SERVER } from '../../lib/constants';

import './Diary.css';

function Diary() {
	const { t } = useTranslation();

	const bgColour = localStorage.getItem('bgColour');
	let lang = localStorage.getItem('lang');
	if (lang === 'ua') lang = 'uk';

	const [chosenDate, setChosenDate] = useState('');
	const [pageData, setPageData] = useState({
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
		notes: '',
	});
	const [pageId, setPageId] = useState();
	const [engToday, setEngToday] = useState();
	const [today, setToday] = useState();

	useEffect(() => {
		getPage();
	}, [engToday]);

	useEffect(() => {
		const { word, numeric } = getToday(lang);
		setToday(word);
		setEngToday(word);
		setChosenDate(numeric);

		if (lang !== 'en') {
			const engToday = getToday('en');
			setEngToday(engToday);
		}
	}, [lang]);

	const getPage = async () => {
		const res = await fetch(`${SERVER}/diary/page/${JSON.parse(localStorage.getItem('user')).id}/${engToday}`);
		const data = await res.json();

		if (data?.page) {
			setPageData(data.page);
			setPageId(data.page._id);
		} else {
			setPageData({
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
				notes: '',
			});
		}
	};

	const onChangeInput = (e) => {
		if (e.target.name === 'selfCare' || e.target.name === 'meditation') {
			return setPageData(prev => ({
				...prev,
				[e.target.name]: e.target.checked
			}));
		}
		setPageData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};
	const savePageData = async () => {
		const endpoint = pageId ? pageId : `${JSON.parse(localStorage.getItem('user')).id}/${engToday}`;
		const method = pageId ? 'PUT' : 'POST';
		
		await fetch(`${SERVER}/diary/page/${endpoint}`, {
			method: method,
			body: JSON.stringify({
				pageData,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	const onChangeDate = async (e) => {
		setChosenDate(e.target.value);
		const chosenDate = new Date(e.target.value);
		const dateInEn = await getDateInLang(chosenDate, 'en');
		const date = lang !== 'en' ? await getDateInLang(chosenDate, lang) : dateInEn;
		setEngToday(dateInEn);
		setToday(date);
	};

	return (
		<div>
			<input
				type='date' name='chosenDate' value={chosenDate}
				onChange={e => onChangeDate(e)}
				style={{ backgroundColor: bgColour }}
				className='chooseDateInp'
			/>
			<h1 className='diaryTitle'>{t('Diary')}</h1>
			<Menu />

			<div>
				<h3 className='todayDate'>{today}</h3>
				<h3 className='dayPart'>{t('Morning')}</h3>

				<div className='affirmationDiv'>
					<input type='text' name='affirmation' value={pageData.affirmation} onChange={e => onChangeInput(e)} />
					<label>{t('affirmation')}</label>
				</div>

				<div className='morningInputDiv'>
					<div>
						<label>{t('Day of the menstrual cycle ')}</label>
						<input type='number' name='menstrualDay' min={1} value={pageData.menstrualDay} onChange={e => onChangeInput(e)} className='pageInputNum' />
					</div>

					<div>
						<div>
							<label>{t('Fell asleep yesterday ')}</label>
							<input type='time' name='fellAsleep' value={pageData.fellAsleep} onChange={e => onChangeInput(e)} />
						</div>
						<div>
							<label>{t('Woke up today ')}</label>
							<input type='time' name='wokeUp' value={pageData.wokeUp} onChange={e => onChangeInput(e)} />
						</div>
						<div>
							<label>{t('Total hours of sleep per day ')}</label>
							<input type='number' name='totalHours' max={24} value={pageData.totalHours} onChange={e => onChangeInput(e)} className='pageInputNum' />
						</div>
					</div>
				</div>

				<h3 className='dayPart'>{t('Evening')}</h3>
				<div className='eveningCheckboxDiv'>
					<div>
						<label>{t('Feeling of happiness ')}</label>
						<input type='number' name='happiness' min={1} max={10} value={pageData.happiness} onChange={e => onChangeInput(e)} className='pageInputNum' />
					</div>
					<div>
						<label>{t('Self care')}</label> <input type='checkbox' name='selfCare' value={pageData.selfCare} onChange={e => onChangeInput(e)} />
					</div>
					<div>
						<label>{t('Meditation')}</label> <input type='checkbox' name='meditation' value={pageData.meditation} onChange={e => onChangeInput(e)} />
					</div>
				</div>

				<div className='eveningInputDiv'>
					<label>{t('Upset me: ')}</label>
					<input type='text' name='upsetMe' value={pageData.upsetMe} onChange={e => onChangeInput(e)} />
				</div>
				<div className='eveningInputDiv'>
					<label>{t('What am I grateful for today: ')}</label>
					<input type='text' name='grateful' value={pageData.grateful} onChange={e => onChangeInput(e)} />
				</div>

				<div className='eveningNumDiv'>
					<div>
						<label>{t('Drank some water ')}</label>
						<input type='number' name='drankWater' value={pageData.drankWater} onChange={e => onChangeInput(e)} className='pageInputNum' />
					</div>
					<div>
						<label>{t('Physical activity ')}</label>
						<input type='number' name='physicalActivity' min={1} max={10} value={pageData.physicalActivity} onChange={e => onChangeInput(e)} className='pageInputNum' />
					</div>
				</div>

				<div className='eveningTextareaDiv'>
					<label>{t('Whatever you want to keep ')}</label>
					<textarea type='text' name='notes' rows={5} value={pageData.notes} onChange={e => onChangeInput(e)} />
				</div>

				<button className='submit savePage' onClick={savePageData}>{t('Save')}</button>
			</div>
		</div>
	);
};

export default Diary;