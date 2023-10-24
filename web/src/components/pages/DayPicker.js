import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import './Picker.css';

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const days = [];

function DayPicker({ day, setDay, setShowPicker }) {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);

	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
	const [selectedDay, setSelectedDay] = useState(new Date().getDate());

	useEffect(() => {
		if (!days.length) {
			let day = 1;
			while (day <= 31) {
				days.push(day);
				day++;
			}
		}
	}, []);

	useEffect(() => {
		if (day) {
			let date = day.split('-');
			setSelectedDay(date[2]);
			setSelectedMonth(date[1]);
			setSelectedYear(date[0]);
		}
	}, [day]);

	const onChange = (dayNumber) => {
		setSelectedDay(dayNumber);

		let day = String(dayNumber).length === 1 ? `0${dayNumber}` : dayNumber;
		const month = String(selectedMonth).length === 1 ? `0${selectedMonth}` : selectedMonth;
		const yearMonthDay = `${selectedYear}-${month}-${day}`;
		setDay(yearMonthDay);

		setShowPicker(false);
	};

	return (
		<div className='pickerContainer datePickerContainer'>
			<div className='yearContainer'>
				<span onClick={() => setSelectedYear(Number(selectedYear) - 1)}>&#60;</span> 
				<span>{selectedYear}</span> 
				<span onClick={() => setSelectedYear(Number(selectedYear) + 1)}>&#62;</span>
			</div>

			<div className='yearContainer'>
				<span onClick={() => {
					selectedMonth === 1 
					? setSelectedMonth(12)
					: setSelectedMonth(Number(selectedMonth) - 1)}
				}>&#60;</span>

				<span>{t(months[selectedMonth - 1])}</span> 
				
				<span onClick={() => {
					selectedMonth === 12
					? setSelectedMonth(1)
					: setSelectedMonth(Number(selectedMonth) + 1)}
				}>&#62;</span>
			</div>	

			<div className='dayNumContainer'>
				{days.map(day => (
					<span
						key={day}
						style={{backgroundColor: day === Number(selectedDay) && bgColour}}
						onClick={() => onChange(day)}
					>{day}</span>)
				)}
			</div>

			<span className='cancel' onClick={() => setShowPicker(false)}>{t('CANCEL')}</span>
		</div>
	);
};

export default DayPicker;
