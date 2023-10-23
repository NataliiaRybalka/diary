import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './Picker.css';

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

function MonthPicker({ month, setMonth, setShowPicker }) {
	const { t } = useTranslation();

	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

	useEffect(() => {
		if (month) {
			let date = month.split('-');
			setSelectedMonth(date[1]);
			setSelectedYear(date[0]);
		}
	}, []);


	const onChange = (monthNumber) => {
		setSelectedMonth(monthNumber);

		const month = String(monthNumber).length === 1 ? `0${monthNumber}` : monthNumber;
		const yearMonth = `${selectedYear}-${month}`;
		setMonth(yearMonth);

		setShowPicker(false);
	};

	return (
		<div className='pickerContainer'>
			<div className='yearContainer'>
				<span onClick={() => setSelectedYear(selectedYear - 1)}>&#60;</span> 
				<span>{selectedYear}</span> 
				<span onClick={() => setSelectedYear(selectedYear + 1)}>&#62;</span>
			</div>	

			<div className='monthContainer'>
				{months.map((month, index) => (
					<span
						key={month}
						style={{backgroundColor: index + 1 === Number(selectedMonth) && '#00FFFF'}}
						onClick={() => onChange(index + 1)}
					>{t(month)}</span>)
				)}
			</div>

			<span className='cancel' onClick={() => setShowPicker(false)}>{t('CANCEL')}</span>
		</div>
	);
};

export default MonthPicker;
