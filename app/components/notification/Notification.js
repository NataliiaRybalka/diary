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

	const onChangeInput = (type) => {

		// if (e.target.type === 'checkbox') {
		// 	return setNotifications(prev => ({
		// 		...prev,
		// 		...{
		// 			[e.target.name]: {
		// 				send: e.target.checked,
		// 				time: notifications[e.target.name].time,
		// 				language: notifications[e.target.name].language,
		// 			}
		// 		}
		// 	}));
		// }

		// if (e.target.type === 'select-one') {
		// 	return setNotifications(prev => ({
		// 		...prev,
		// 		...{
		// 			[e.target.name]: {
		// 				send: notifications[e.target.name].send,
		// 				time: notifications[e.target.name].time,
		// 				language: e.target.value,
		// 			}
		// 		}
		// 	}));
		// }

		// return setNotifications(prev => ({
		// 	...prev,
		// 	...{
		// 		[e.target.name]: {
		// 			send: notifications[e.target.name].send,
		// 			time: e.target.value,
		// 			language: notifications[e.target.name].language,
		// 		}
		// 	}
		// }));
	}
console.log(notifications);
	const updateNotification = async() => {
		const resp = await fetch(`${SERVER}/notification/${user?.id}`, {
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
	};

	return (
		<View style={[styles.container, { backgroundColor: bgColour }]}>
			<Text style={styles.label}>{t('Fill in the morning diary')}</Text>
			<View style={styles.checkboxContainer}>
				<Checkbox
					value={notifications.morning?.send}
					onValueChange={onChangeInput('morning')}
					style={styles.checkbox}
				/>
				{/* <TimePicker
					time={notifications.morning?.time}
				/> */}
			</View>

			<Text style={styles.label}>{t('Fill in the evening diary')}</Text>
			<View style={styles.checkboxContainer}>
				<Checkbox
					value={notifications.evening?.send}
					onValueChange={onChangeInput}
					style={styles.checkbox}
				/>
				{/* <TimePicker
					time={notifications.evening?.time}
				/> */}
			</View>

			<View style={styles.checkboxContainer}>
				<Text style={styles.label}>{t('Scheduled Task')}</Text>
				<Checkbox
					value={notifications.day_plan?.send}
					onValueChange={onChangeInput}
					style={styles.checkbox}
				/>
			</View>

			{err && <Text style={styles.err}>{err}</Text>}
			<View style={styles.btn}>
				<Text style={styles.btnText} onPress={updateNotification}>{t('Update')}</Text>
			</View>
		</View>
		// <div className="center notification">
		// 	<h2>{t('Set up notifications')}</h2>
		// 	<div className='form'>
		// 		<div className='checkboxDelete'>
		// 			<label>{t('Fill in the morning diary')}</label> 
		// 			<input type='checkbox' name='morning' checked={notifications.morning?.send} onChange={e => onChangeInput(e)} />
		// 			<input type='time' name='morning' value={notifications.morning?.time} className='timeInput' onChange={e => onChangeInput(e)} />
		// 			<select className='langNotifications' name='morning' value={notifications.morning?.language} onChange={e => onChangeInput(e)}>
		// 				<option value='en'>en</option>
		// 				<option value='ru'>ru</option>
		// 				<option value='ua'>ua</option>
		// 			</select>
		// 		</div>
		// 		<div className='checkboxDelete'>
		// 			<label>{t('Fill in the evening diary')}</label> 
		// 			<input type='checkbox' name='evening' checked={notifications.evening?.send} onChange={e => onChangeInput(e)} />
		// 			<input type='time' name='evening' value={notifications.evening?.time} className='timeInput' onChange={e => onChangeInput(e)} />
		// 			<select className='langNotifications' name='evening' value={notifications.evening?.language} onChange={e => onChangeInput(e)}>
		// 				<option value='en'>en</option>
		// 				<option value='ru'>ru</option>
		// 				<option value='ua'>ua</option>
		// 			</select>
		// 		</div>
		// 		<div className='checkboxDelete'>
		// 			<label>{t('Scheduled Task')}</label> 
		// 			<input type='checkbox' name='day_plan' checked={notifications.day_plan?.send} onChange={e => onChangeInput(e)} />
		// 		</div>
		// 		{err && <p className='pError'>{err}</p>}
		// 		<button className='submit restoreSubmit notificationSubmit' onClick={updateNotification}>{t('Update')}</button>
		// 	</div>
		// </div>
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