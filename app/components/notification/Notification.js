import { useState, useEffect, useCallback } from 'react';
import Checkbox from 'expo-checkbox';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

import Dropdown from '../pages/Dropdown';
import { SERVER } from '../../lib/constants';
import TimePicker from '../pages/TimePicker';

import { styles } from './styles';

function Notification() {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);
	const language = useSelector(state => state.language.value);
	const user = useSelector(state => state.user.value);

	const [notifications, setNotifications] = useState({
		morning: {
			send: true,
			time: '08:00',
			language,
		},
		evening: {
			send: true,
			time: '08:00',
			language,
		},
		day_plan: {
			send: true,
		},
	});
	const [err, setErr] = useState(null);
	const [rowInFocus, setRowInFocus] = useState(null);
	const [time, setTime] = useState();
	const [notifLang, setNotifLang] = useState(null);
	const [saved, setSaved] = useState(false);

	useFocusEffect(
		useCallback(() => {
			getNotificationSettings();
		}, [])
	);

	const getNotificationSettings = async () => {
		const resp = await fetch(`${SERVER}/notification/${user._id}`);
		const data = await resp.json();

		const timezone = new Date().getTimezoneOffset()/60;
		for (const notif in data) {
			if (!data[notif].time) continue;

			const notification = data[notif];
			const timeForSend = notification.time.split(':');
			timeForSend[0] = Number(timeForSend[0]);
			if ((timeForSend[0] - timezone) < 24) timeForSend[0] = timeForSend[0] - timezone;
			else timeForSend[0] = (timeForSend[0] - timezone) - 24;

			timeForSend[0] = String(timeForSend[0]);
			timeForSend[0] = timeForSend[0].length === 1 ? `0${timeForSend[0]}` : timeForSend[0];

			notification.time = timeForSend.join(':');
		}

		if (!data.morning) data.morning = {
			send: true,
			time: '08:00',
			language,
		};
		if (!data.evening) data.evening = {
			send: true,
			time: '08:00',
			language,
		};

		const newNotifs = {
			morning: data.morning,
			evening: data.evening,
			day_plan: data.day_plan ? data.day_plan : {
				send: true,
			},
		};

		setNotifications(newNotifs);
	};

	const onChangeSendInput = (type) => {
		const updatedField = notifications[type];
		updatedField.send = !updatedField.send;
		setNotifications(prev => ({
			...prev,
			[type]: updatedField
		}));
	};

	useEffect(() => {
		const updatedField = notifications[rowInFocus];
		if (updatedField?.time) updatedField.time = time;
		setNotifications(prev => ({
			...prev,
			[rowInFocus]: updatedField
		}));
	}, [time]);

	useEffect(() => {
		const updatedField = notifications[rowInFocus];
		if (updatedField?.language) updatedField.language = notifLang;
		setNotifications(prev => ({
			...prev,
			[rowInFocus]: updatedField
		}));
	}, [notifLang]);

	const updateNotification = async() => {
		const resp = await fetch(`${SERVER}/notification/${user._id}`, {
			method: 'PUT',
			body: JSON.stringify({
				notifications,
				timezone: new Date().getTimezoneOffset()/60,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await resp.json();
		if (resp.status !== 201) setErr(JSON.stringify(data));
		else setSaved(true);
	};

	return (
		<View style={[styles.container, { backgroundColor: bgColour }]}>
			<View style={styles.partContainer}>
				<View style={styles.checkboxContainer}>
					<Text style={styles.label}>{t('Fill in the morning diary')}</Text>
					<Checkbox
						value={notifications.morning?.send}
						onValueChange={() => onChangeSendInput('morning')}
						style={styles.checkbox}
					/>
				</View>
				<View style={styles.checkboxContainer} >
					<TimePicker
						time={notifications.morning?.time}
						setTime={setTime}
						row={'morning'}
						setRowInFocus={setRowInFocus}
					/>
					<Dropdown
						data={['en', 'ru', 'ua']}
						entity={'notifLang'}
						select={notifications.morning?.language}
						setData={setNotifLang}
						row={'morning'}
						setRowInFocus={setRowInFocus}
					/>
				</View>
			</View>

			<View style={styles.partContainer}>
				<View style={styles.checkboxContainer}>
					<Text style={styles.label}>{t('Fill in the evening diary')}</Text>
					<Checkbox
						value={notifications.evening?.send}
						onValueChange={() => onChangeSendInput('evening')}
						style={styles.checkbox}
					/>
				</View>
				<View style={styles.checkboxContainer}>
					<TimePicker
						time={notifications.evening?.time}
						setTime={setTime}
						row={'evening'}
						setRowInFocus={setRowInFocus}
					/>
					<Dropdown
						data={['en', 'ru', 'ua']}
						entity={'notifLang'}
						select={notifications.evening?.language}
						setData={setNotifLang}
						row={'evening'}
						setRowInFocus={setRowInFocus}
					/>
				</View>
			</View>

			<View style={[styles.checkboxContainer, styles.partContainer]}>
				<Text style={styles.label}>{t('Scheduled Task')}</Text>
				<Checkbox
					value={notifications.day_plan?.send}
					onValueChange={() => onChangeSendInput('day_plan')}
					style={styles.checkbox}
				/>
			</View>

			{err && <Text style={styles.err}>{err}</Text>}
			{saved && <Text style={styles.result}>{t('Saved successfully')}</Text>}
			<View style={styles.btn}>
				<Text style={styles.btnText} onPress={updateNotification}>{t('Update')}</Text>
			</View>
		</View>
	);
};

export default Notification;