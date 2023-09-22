import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { getMonday, getWeekDays } from '../../lib/getDates';
import { SERVER } from '../../lib/constants';

function WeekPlans({ navigation }) {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);
	let lang = useSelector(state => state.language.value);
	if (lang === 'ua') lang = 'uk';

	const [dates, setDates] = useState([]);
	const [engDates, setEngDates] = useState([]);
	const [savedWeekPlan, setSavedWeekPlan] = useState({});

	useFocusEffect(
		useCallback(() => {
			getWeekPlan();
		}, [])
	);

	useEffect(() => {
		const week = getWeekDays(lang);
		setDates(week);

		if (lang !== 'en') {
			const week = getWeekDays('en');
			return setEngDates(week);
		} 
		setEngDates(week);		
	}, [lang]);

	const getWeekPlan = async () => {
		const monday = await getMonday(new Date());
		const user = await AsyncStorage.getItem('user');
		const res = await fetch(`${SERVER}/diary/week-plan/${JSON.parse(user).id}/${monday}`);
		const data = await res.json();
		setSavedWeekPlan(data);
	};

	return (
		<ScrollView style={[styles.container, {backgroundColor: bgColour}]}>
			{dates.length
				? dates.map((date, index) => (
					<Text
						key={index}
						style={styles.row}
						onPress={() => navigation.navigate('Update Week Plan', {
							date,
							engDate: engDates[index],
							dayPlan: savedWeekPlan[index],
							lang,
						})}
					>
						{date}
					</Text>
				))
				: <></>
			}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		minHeight: '100%',
	},
	newMonth: {
		borderWidth: 1,
		width: 200,
		textAlign: 'center',
		marginHorizontal: 10,
		fontSize: 16,
		marginBottom: 10
	},
	row: {
		borderWidth: 1,
		fontSize: 16,
		paddingHorizontal: 10,
		lineHeight: 30,
		height: 30,
		marginVertical: 5,
	}
});

export default WeekPlans;

		{/* <div>
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
									{
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
									}
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
		</div> */}