import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView, TextInput } from 'react-native';

import DayPicker from '../pages/DayPicker';
import { getToday } from '../../lib/getDates';
import { SERVER } from '../../lib/constants';
import TimePicker from '../pages/TimePicker';

import { styles } from './styles';

function Day() {
	const { t } = useTranslation();

	const bgColour = useSelector(state => state.bgColour.value);
	let lang = useSelector(state => state.language.value);
	if (lang === 'ua') lang = 'uk';

	const [chosenDate, setChosenDate] = useState('');
	const [pageData, setPageData] = useState({
		affirmation: '',
		menstrualDay: '',
		totalHours: '',
		grateful: '',
		feeling: '',
		drankWater: '',
		physicalActivity: '',
		notes: '',
	});
	const [pageId, setPageId] = useState();
	const [fellAsleep, setFellAsleep] = useState('');
	const [wokeUp, setWokeUp] = useState('');
	const [saved, setSaved] = useState(false);
	const [showPicker, setShowPicker] = useState(false);

	useEffect(() => {
		const { numeric } = getToday(lang);
		setChosenDate(numeric);
	}, []);

	useFocusEffect(
		useCallback(() => {
			getPage();
			setSaved(false);
		}, [chosenDate])
	);

	const getPage = async () => {
		const user = await AsyncStorage.getItem('user');
		const res = await fetch(`${SERVER}/diary/page/${JSON.parse(user).id}/${chosenDate}`);
		const data = await res.json();

		if (data) {
			setPageData(data);
			setPageId(data._id);
			setFellAsleep(data.fellAsleep);
			setWokeUp(data.wokeUp);
		} else {
			setPageId();
			setPageData({
				affirmation: '',
				menstrualDay: '',
				totalHours: '',
				grateful: '',
				feeling: '',
				drankWater: '',
				physicalActivity: '',
				notes: '',
			});
			setFellAsleep('');
			setWokeUp('');
		}
	};

	const onChangeInput = (text, field) => {
		if (field === 'selfCare' || field=== 'meditation') {
			return setPageData(prev => ({
				...prev,
				[field]: text
			}));
		}
		setPageData(prev => ({
			...prev,
			[field]: text
		}));
	};

	const savePageData = async () => {
		pageData.fellAsleep = fellAsleep;
		pageData.wokeUp = wokeUp;

		const user = await AsyncStorage.getItem('user');
		const endpoint = pageId ? pageId : `${JSON.parse(user).id}/${chosenDate}`;
		const method = pageId ? 'PUT' : 'POST';
		
		const resp = await fetch(`${SERVER}/diary/page/${endpoint}`, {
			method,
			body: JSON.stringify({
				pageData,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (resp.status === 201) {
			const data = await resp.json();
			setPageData(data);
			setSaved(true);
		}
	};

	return (
		<ScrollView style={[styles.container, {backgroundColor: bgColour}, showPicker && {backgroundColor: 'rgba(0, 0, 0, 0.7)'}]}>
			<DayPicker day={chosenDate} setDay={setChosenDate} showPicker={showPicker} setShowPicker={setShowPicker} />

			<View style={{ marginHorizontal: 5 }}>
				<Text style={styles.dayPart}>{t('Morning')}</Text>
				<TextInput
					style={styles.inputDay}
					value={pageData.affirmation}
					placeholder={t('affirmation')}
					onChangeText={text => onChangeInput(text, 'affirmation')}
				/>

				<View style={styles.div}>
					<Text style={styles.label}>{t('Day of the menstrual cycle')}</Text>
					<TextInput
						style={styles.inputNum}
						value={pageData.menstrualDay ? String(pageData.menstrualDay) : ''}
						keyboardType='number-pad'
						onChangeText={text => onChangeInput(text, 'menstrualDay')}
					/>
				</View>

				<View style={styles.div}>
					<Text style={styles.label}>{t('Fell asleep yesterday')}</Text>
					<TimePicker time={fellAsleep} setTime={setFellAsleep} />
				</View>
				<View style={styles.div}>
					<Text style={styles.label}>{t('Woke up today')}</Text>
					<TimePicker time={wokeUp} setTime={setWokeUp} />
				</View>

				<View style={styles.div}>
					<Text style={styles.label}>{t('Total hours of sleep per day')}</Text>
					<TextInput
						style={styles.inputNum}
						value={pageData.totalHours ? String(pageData.totalHours) : ''}
						keyboardType='number-pad'
						onChangeText={text => onChangeInput(text, 'totalHours')}
					/>
				</View>

				<Text style={styles.dayPart}>{t('Evening')}</Text>
				<TextInput
					style={styles.inputDay}
					value={pageData.grateful}
					placeholder={t('what am I grateful for today:')}
					onChangeText={text => onChangeInput(text, 'grateful')}
				/>

				<TextInput
					style={styles.inputDay}
					value={pageData.feeling}
					placeholder={t('how am I feeling today?')}
					onChangeText={text => onChangeInput(text, 'feeling')}
				/>

				<View style={styles.div}>
					<Text style={styles.label}>{t('Drank some water')}</Text>
					<TextInput
						style={styles.inputNum}
						value={pageData.drankWater ? String(pageData.drankWater) : ''}
						keyboardType='number-pad'
						onChangeText={text => onChangeInput(text, 'drankWater')}
					/>
				</View>

				<View style={styles.div}>
					<Text style={styles.label}>{t('Physical activity')}</Text>
					<TextInput
						style={styles.inputNum}
						value={pageData.physicalActivity ? String(pageData.physicalActivity) : ''}
						keyboardType='number-pad'
						onChangeText={text => onChangeInput(text, 'physicalActivity')}
					/>
				</View>

				<TextInput
					style={styles.inputDay}
					value={pageData.notes}
					placeholder={t('whatever you want to keep')}
					onChangeText={text => onChangeInput(text, 'notes')}
				/>
			</View>

			<View style={styles.btn}>
				<Text style={styles.btnText} onPress={savePageData}>{t('Save')}</Text>
			</View>

			{saved && <Text style={styles.result}>{t('Saved successfully')}</Text>}
		</ScrollView>
	);
};

export default Day;