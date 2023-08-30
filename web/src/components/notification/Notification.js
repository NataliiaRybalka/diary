import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { SERVER } from '../../lib/constants';

import './Notification.css';

function Notification({ user }) {
	const { t } = useTranslation();

	const [notifications, setNotifications] = useState({
		morning: {
			send: true,
			time: '08:00',
			language: localStorage.getItem('lang') || 'en',
		},
		evening: {
			send: true,
			time: '08:00',
			language: localStorage.getItem('lang') || 'en',
		},
		day_plan: {
			send: true,
		},
	});
	const [err, setErr] = useState(null);

	useEffect(() => {
		getNotificationSettings();
	}, []);

	const getNotificationSettings = async () => {
		const resp = await fetch(`${SERVER}/notification/${user?.id}`);
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

		setNotifications(data);
	};

	const onChangeInput = (e) => {
		if (e.target.type === 'checkbox') {
			return setNotifications(prev => ({
				...prev,
				...{
					[e.target.name]: {
						send: e.target.checked,
						time: notifications[e.target.name].time,
						language: notifications[e.target.name].language,
					}
				}
			}));
		}

		if (e.target.type === 'select-one') {
			return setNotifications(prev => ({
				...prev,
				...{
					[e.target.name]: {
						send: notifications[e.target.name].send,
						time: notifications[e.target.name].time,
						language: e.target.value,
					}
				}
			}));
		}

		return setNotifications(prev => ({
			...prev,
			...{
				[e.target.name]: {
					send: notifications[e.target.name].send,
					time: e.target.value,
					language: notifications[e.target.name].language,
				}
			}
		}));
	}

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
		<div className="center notification">
			<h2>{t('Set up notifications')}</h2>
			<div className='form'>
				<div className='checkboxDelete'>
					<label>{t('Fill in the morning diary')}</label> 
					<input type='checkbox' name='morning' checked={notifications.morning.send} onChange={e => onChangeInput(e)} />
					<input type='time' name='morning' value={notifications.morning.time} className='timeInput' onChange={e => onChangeInput(e)} />
					<select className='langNotifications' name='morning' value={notifications.morning.language} onChange={e => onChangeInput(e)}>
						<option value='en'>en</option>
						<option value='ru'>ru</option>
						<option value='ua'>ua</option>
					</select>
				</div>
				<div className='checkboxDelete'>
					<label>{t('Fill in the evening diary')}</label> 
					<input type='checkbox' name='evening' checked={notifications.evening.send} onChange={e => onChangeInput(e)} />
					<input type='time' name='evening' value={notifications.evening.time} className='timeInput' onChange={e => onChangeInput(e)} />
					<select className='langNotifications' name='evening' value={notifications.evening.language} onChange={e => onChangeInput(e)}>
						<option value='en'>en</option>
						<option value='ru'>ru</option>
						<option value='ua'>ua</option>
					</select>
				</div>
				<div className='checkboxDelete'>
					<label>{t('Scheduled Task')}</label> 
					<input type='checkbox' name='day_plan' checked={notifications.day_plan.send} onChange={e => onChangeInput(e)} />
				</div>
				{err && <p className='pError'>{err}</p>}
				<button className='submit restoreSubmit notificationSubmit' onClick={updateNotification}>{t('Update')}</button>
			</div>
		</div>
	);
};

export default Notification;