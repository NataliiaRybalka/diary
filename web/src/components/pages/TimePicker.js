import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import './Picker.css';

function TimePicker({ time, setTime, setShowPicker }) {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);

	const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes());
	const [selectedHour, setSelectedHour] = useState(new Date().getHours());

	useEffect(() => {
		if (time) {
			let splitedTime = time.split(':');
			setSelectedHour(splitedTime[0]);
			setSelectedMinute(splitedTime[1]);
		}
	}, [time]);

	const onChange = (minuteNum) => {
		setSelectedMinute(minuteNum);

		const hourMinute = `${selectedHour}:${minuteNum}`;
		setTime(hourMinute);

		setShowPicker(false);
	};

	return (
		<div className='pickerContainer timePickerContainer'>
			<div className='timeContainer'>
				<div className='hourContainer'>
					{[...Array(24)].map((hour, hourNum) => (
						<span
							key={hourNum}
							style={{backgroundColor: hourNum === Number(selectedHour) && bgColour}}
							onClick={() => setSelectedHour(String(hourNum).length === 1 ? `0${hourNum}` : hourNum)}
						>
							{String(hourNum).length === 1 ? `0${hourNum}` : hourNum}
						</span>
					))}
				</div>

				<div className='hourContainer'>
					{[...Array(60)].map((minute, minuteNum) => (
						<span
							key={minuteNum}
							style={{backgroundColor: minuteNum === Number(selectedMinute) && bgColour}}
							onClick={() => onChange(String(minuteNum).length === 1 ? `0${minuteNum}` : minuteNum)}
						>
							{String(minuteNum).length === 1 ? `0${minuteNum}` : minuteNum}
						</span>
					))}
				</div>
			</div>

			<span className='cancel' onClick={() => setShowPicker(false)}>{t('CANCEL')}</span>
		</div>
	);
};

export default TimePicker;
