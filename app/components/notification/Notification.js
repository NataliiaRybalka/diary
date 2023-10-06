import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useFocusEffect } from '@react-navigation/native';

import Dropdown from '../pages/Dropdown';
import { SERVER } from '../../lib/constants';
import TimePicker from '../pages/TimePicker';

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

	useFocusEffect(
		useCallback(() => {
			getNotificationSettings();
		}, [])
	);

	const getNotificationSettings = async () => {
		const resp = await fetch(`${SERVER}/notification/${user.id}`);
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

		setNotifications(data);
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

	// const onChangeInput = () => {
	// 	if (e.target.type === 'checkbox') {
	// 		return setNotifications(prev => ({
	// 			...prev,
	// 			...{
	// 				[e.target.name]: {
	// 					send: e.target.checked,
	// 					time: notifications[e.target.name].time,
	// 					language: notifications[e.target.name].language,
	// 				}
	// 			}
	// 		}));
	// 	}

	// 	if (e.target.type === 'select-one') {
	// 		return setNotifications(prev => ({
	// 			...prev,
	// 			...{
	// 				[e.target.name]: {
	// 					send: notifications[e.target.name].send,
	// 					time: notifications[e.target.name].time,
	// 					language: e.target.value,
	// 				}
	// 			}
	// 		}));
	// 	}

	// 	return setNotifications(prev => ({
	// 		...prev,
	// 		...{
	// 			[e.target.name]: {
	// 				send: notifications[e.target.name].send,
	// 				time: e.target.value,
	// 				language: notifications[e.target.name].language,
	// 			}
	// 		}
	// 	}));
	// }

	const updateNotification = async() => {
		console.log(notifications);
		// const resp = await fetch(`${SERVER}/notification/${user?.id}`, {
		// 	method: 'PUT',
		// 	body: JSON.stringify({
		// 		notifications,
		// 		timezone: new Date().getTimezoneOffset()/60,
		// 	}),
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// });

		// const data = await resp.json();
		// if (resp.status !== 201) setErr(JSON.stringify(data));
	};

	return (
		<View style={[styles.container, { backgroundColor: bgColour }]}>
			<Text style={styles.label}>{t('Fill in the morning diary')}</Text>
			<View style={styles.checkboxContainer} >
				<Checkbox
					value={notifications.morning?.send}
					onValueChange={() => onChangeSendInput('morning')}
					style={styles.checkbox}
				/>
				<TimePicker
					time={notifications.morning?.time}
					setTime={setTime}
					row={'morning'}
					setRowInFocus={setRowInFocus}
				/>
			</View>

			<Text style={styles.label}>{t('Fill in the evening diary')}</Text>
			<View style={styles.checkboxContainer}>
				<Checkbox
					value={notifications.evening?.send}
					onValueChange={() => onChangeSendInput('evening')}
					style={styles.checkbox}
				/>
				<TimePicker
					time={notifications.evening?.time}
					setTime={setTime}
					row={'evening'}
					setRowInFocus={setRowInFocus}
				/>
			</View>

			<View style={styles.checkboxContainer}>
				<Text style={styles.label}>{t('Scheduled Task')}</Text>
				<Checkbox
					value={notifications.day_plan?.send}
					onValueChange={() => onChangeSendInput('day_plan')}
					style={styles.checkbox}
				/>
			</View>

			{err && <Text style={styles.err}>{err}</Text>}
			<View style={styles.btn}>
				<Text style={styles.btnText} onPress={updateNotification}>{t('Update')}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		textAlign: 'center',
	},
	label: {
		fontSize: 16,
		textAlign: 'center',
	},
	checkboxContainer: {
		justifyContent: 'center',
		flexDirection: 'row'
	},
	checkbox: {
		marginLeft: 10
	},
	err: {
		color: '#ff0000',
		textAlign: 'center',
	},
	btn: {
		height: 40,
		borderRadius: 25,
		borderColor: '#000000',
		borderStyle: 'solid',
		borderWidth: 1,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: '50%',
		marginTop: 10,
		marginLeft: '25%'
	},
	btnText: {
		fontSize: 18,
		fontWeight: '700',
	},
});

export default Notification;