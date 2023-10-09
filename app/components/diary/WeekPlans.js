import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { getMonday, getWeekDays } from '../../lib/getDates';
import { SERVER } from '../../lib/constants';

import { styles } from './styles';

function WeekPlans({ navigation }) {
	const bgColour = useSelector(state => state.bgColour.value);
	let lang = useSelector(state => state.language.value);

	const [dates, setDates] = useState([]);
	const [engDates, setEngDates] = useState([]);
	const [savedWeekPlan, setSavedWeekPlan] = useState({});

	useFocusEffect(
		useCallback(() => {
			getWeekPlan();
		}, [])
	);

	useEffect(() => {
		if (lang === 'ua') lang = 'uk';
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

export default WeekPlans;